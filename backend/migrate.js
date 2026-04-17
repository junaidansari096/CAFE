import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const LOCAL_URI = 'mongodb://localhost:27017/stich_demo';
const ATLAS_URI = process.env.MONGO_URI;

if (!ATLAS_URI || ATLAS_URI.includes('<db_password>')) {
  console.error('❌ Error: MONGO_URI in .env is not correctly set. Please update your password first.');
  process.exit(1);
}

async function migrate() {
  try {
    console.log('🚀 Starting Migration...');

    // Connect to Local
    const localConn = await mongoose.createConnection(LOCAL_URI).asPromise();
    console.log('✅ Connected to Local MongoDB');

    // Connect to Atlas
    const atlasConn = await mongoose.createConnection(ATLAS_URI).asPromise();
    console.log('✅ Connected to MongoDB Atlas');

    // Get all collections from local
    const collections = await localConn.db.listCollections().toArray();
    
    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      
      // Skip system collections
      if (collectionName.startsWith('system.')) continue;
      
      console.log(`\n📦 Processing collection: ${collectionName}`);

      const LocalModel = localConn.model(collectionName, new mongoose.Schema({}), collectionName);
      const AtlasModel = atlasConn.model(collectionName, new mongoose.Schema({}), collectionName);

      // Fetch all documents from local
      const docs = await LocalModel.find({}).lean();
      console.log(`   Found ${docs.length} documents in local.`);

      if (docs.length > 0) {
        // Clear Atlas collection first to avoid duplicates
        await AtlasModel.deleteMany({});
        console.log(`   Cleared Atlas collection: ${collectionName}`);

        // Insert into Atlas
        await AtlasModel.insertMany(docs);
        console.log(`   Successfully migrated ${docs.length} documents to Atlas.`);
      } else {
        console.log(`   Skipping empty collection.`);
      }
    }

    console.log('\n✨ MIGRATION COMPLETE! Your cloud database is now an exact copy of your local one.');
  } catch (err) {
    console.error('\n❌ Migration failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

migrate();
