var mongoose = require ('mongoose'),
    bcrypt = require ('bcrypt'),
    SALT_WORK_FACTOR = 10;

// MONGOOSE SCHEMAS & MODELS

// =============================================

var UserSchema = mongoose.Schema({
  email: { type: String, unique: true, required:true, index: {unique:true} },
  password: { type: String, default: null }, 
  roles: [{ role: String, place: String, color: String, goals: [{title: String}]}],
  // wizard_progress: states - 
  // 0: not started,
  // 1: stopped on Register step, password not yet set
  // 2: stopped on Roles step, password was set, roles inputed in text fields but never saved
  // 3: stopped on Goals step, password was set, roles defined
  // 4: stopped on Actions step, password was set, roals and goals defined
  // 5: wizard was completed
  details: {wizard_progress: {type: Number, min:0, max:5} }
});

UserSchema.pre('save', function(next) {
    console.log('================================================');
    console.log("-----------> UserSchema.pre(save):");
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        console.log ("SALT: " + salt);
        console.log ("User pass: " + user.password);
        // hash the password along with our new salt
        if (user.password != null) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                console.log("==== ERROR: BCrypt hash error: " + err);
                return next(err);
              }

              // override the cleartext password with the hashed one
              user.password = hash;
              next();
          });
        } else {
          console.log("Password was not provided at this point.");
          next();
        }
    });
});


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    console.log('=========== > user-model -> UserSchema.models.comaprePass');
    console.log('Original password:' + this.password);
    console.log('user input passwd:' + candidatePassword);
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
          console.log('ERROR');
          console.log(err);
          return cb(err);
        }
        console.log('=== BCRYPT Callbacl ===');
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

