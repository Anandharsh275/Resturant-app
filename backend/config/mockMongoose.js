const mockDb = {
  users: [],
  categories: [],
  resturants: [],
  foods: [],
  orders: []
};

const getCollection = (modelName) => {
  const name = modelName.toLowerCase();
  if (name.includes('user')) return mockDb.users;
  if (name.includes('category')) return mockDb.categories;
  if (name.includes('resturant') || name.includes('restaurant')) return mockDb.resturants;
  if (name.includes('food')) return mockDb.foods;
  if (name.includes('order')) return mockDb.orders;
  
  if (!mockDb[name]) mockDb[name] = [];
  return mockDb[name];
};

class MockModel {
  constructor(data = {}) {
    Object.assign(this, data);
    if (!this._id) {
      this._id = "mock_" + Math.random().toString(36).substr(2, 9);
    }
    // Set default fields
    if (this.constructor._modelName.toLowerCase().includes('user') && !this.usertype) {
      this.usertype = 'client';
    }
  }

  async save() {
    const collection = getCollection(this.constructor._modelName);
    const existingIndex = collection.findIndex(item => item._id === this._id);
    if (existingIndex > -1) {
      collection[existingIndex] = this;
    } else {
      collection.push(this);
    }
    return this;
  }

  static async find(query = {}) {
    const collection = getCollection(this._modelName);
    
    return collection.filter(item => {
      for (let key in query) {
        // Handle _id query if it is an object
        let qVal = query[key];
        let iVal = item[key];
        
        if (key === '_id' && qVal && typeof qVal === 'object' && qVal._id) {
          qVal = qVal._id;
        }
        if (iVal && typeof iVal === 'object' && iVal._id) {
          iVal = iVal._id;
        }

        if (qVal !== undefined && iVal !== qVal) {
          return false;
        }
      }
      return true;
    });
  }

  static async findOne(query = {}) {
    const results = await this.find(query);
    return results[0] || null;
  }

  static async findById(id) {
    if (!id) return null;
    let searchId = id;
    if (typeof id === 'object' && id._id) searchId = id._id;
    searchId = searchId.toString();

    const collection = getCollection(this._modelName);
    return collection.find(item => item._id.toString() === searchId) || null;
  }

  static async findByIdAndUpdate(id, update, options = {}) {
    const item = await this.findById(id);
    if (item) {
      // If it's a mongoose update object (contains $set or direct fields)
      if (update.$set) {
        Object.assign(item, update.$set);
      } else {
        Object.assign(item, update);
      }
      await item.save();
    }
    return item;
  }

  static async findByIdAndDelete(id) {
    if (!id) return null;
    let searchId = id;
    if (typeof id === 'object' && id._id) searchId = id._id;
    searchId = searchId.toString();

    const collection = getCollection(this._modelName);
    const index = collection.findIndex(item => item._id.toString() === searchId);
    if (index > -1) {
      const deleted = collection.splice(index, 1);
      return deleted[0];
    }
    return null;
  }

  static async create(data) {
    const doc = new this(data);
    return doc.save();
  }

  static async countDocuments() {
    return getCollection(this._modelName).length;
  }

  static async insertMany(arr) {
    const docs = [];
    for (let data of arr) {
      const doc = new this(data);
      await doc.save();
      docs.push(doc);
    }
    return docs;
  }
}

const mockMongoose = {
  Schema: class {
    constructor(definition, options) {
      this.definition = definition;
      this.options = options;
    }
  },
  model(name, schema) {
    if (mockMongoose.models[name]) {
      return mockMongoose.models[name];
    }
    
    const SpecificModel = class extends MockModel {};
    SpecificModel._modelName = name;
    
    mockMongoose.models[name] = SpecificModel;
    return SpecificModel;
  },
  models: {},
  connect: async (uri) => {
    console.log("Mock connection initialized successfully.".green);
    return true;
  },
  connection: {
    host: 'Mock-In-Memory-DB-Server'
  },
  Types: {
    ObjectId: (id) => id || "mock_id_" + Math.random().toString(36).substr(2, 9)
  }
};

mockMongoose.Schema.Types = {
  ObjectId: 'ObjectId'
};

module.exports = mockMongoose;
