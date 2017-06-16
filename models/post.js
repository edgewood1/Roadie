module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    begin_date: {
      type: DataTypes.STRING
    },
    end_date: {
      type: DataTypes.STRING
    },
    place: {
      type: DataTypes.STRING
    }, 
    event_name: {
      type: DataTypes.STRING
    },
    event_date:{
      type: DataTypes.STRING
    },
    event_note: {
      type:DataTypes.STRING
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  
  }, 
  {
    timestamps: false
  } 

  );
  return Post;
};