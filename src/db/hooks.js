export const mongooseSaveError = (err, data, next) => {
  err.status =
    err.name === 'MongoServerError' && err.code === 11000 ? 409 : 400;
  next();
};

export function setUpdateSettings(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
}
