const regExp = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;

export const validates = (activity) => {
  const errors = {};
  const { name, difficulty, duration, season, countriesID } = activity;

  // NAME VALIDATE
  if (!name || name.length === 0)
    errors.name = "El nombre de la actividad es obligatorio";

  if ((name.length !== 0 && name.length < 5) || name.length > 30)
    errors.name = "El nombre debe contener entre 5 y 30 carácteres";

  if (name && !regExp.test(name))
    errors.name = "El nombre no debe contener caracteres especiales ni números";

  // DIFFICULTY VALIDATE
  if (!difficulty)
    errors.difficulty = "La dificultad de la actividad es obligatoria";

  if (difficulty < 1 || difficulty > 5)
    errors.difficulty = "La dificultad debe ser un valor entre 1 y 5";

  // DURATION VALIDATE
  if (!duration) errors.duration = "La duración de la actividad es obligatoria";
  if (duration < 1 || duration > 24)
    errors.duration = "La duración debe ser un valor entre 1 y 24 (horas)";

  // // SEASON VALIDATE
  if (!season) errors.season = "La temporada es obligatoria";

  // // COUNTRIES VALIDATE
  if (!countriesID || countriesID.length === 0)
    errors.countriesID = "Debes seleccionar al menos 1 país";
  return errors;
};
