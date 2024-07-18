export const mongooseSaveError = (err, data, next) => {
  err.status = 400;
  next();
};

export function setUpdateSettings(next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
}
