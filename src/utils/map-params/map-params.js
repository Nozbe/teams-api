const _evaluateIfDefined = (param, eval) =>
  typeof param === "undefined" ? undefined : eval;

const _filterOutUndefined = (target, source) => {
  Object.keys(source).map((key, index) => {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  });

  return target;
};

const mapTaskParams = ({ taskName, isPriority, isCompleted }) =>
  _filterOutUndefined(
    {},
    {
      name: _evaluateIfDefined(taskName, taskName),
      priority_position: _evaluateIfDefined(isPriority, isPriority ? 1 : null),
      ended_at: _evaluateIfDefined(
        isCompleted,
        isCompleted ? Date.now() : null
      ),
    }
  );

const mapProjectParams = ({ projectName, isFavorite, isCompleted }) =>
  _filterOutUndefined(
    {},
    {
      name: _evaluateIfDefined(projectName, projectName),
      is_favorite: _evaluateIfDefined(isFavorite, isFavorite),
      ended_at: _evaluateIfDefined(
        isCompleted,
        isCompleted ? Date.now() : null
      ),
    }
  );

module.exports = {
  mapTaskParams,
  mapProjectParams,
};
