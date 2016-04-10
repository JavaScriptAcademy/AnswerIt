Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   user.profile.isTeacher = false;
   return user;
});