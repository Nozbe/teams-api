# `@nozbe/teams-api` reference

> ⚠️ This package is still a WIP and the reference does not cover all the fields in responses. It gives a glimpse of what's possible, though.

## The `client`

The `client` object denotes the Nozbe Teams application. Create it using the top-level constructor exported by `@nozbe/teams-api`:

```js
import NozbeTeams from "@nozbe/teams-api";

const client = new NozbeTeams("fakeApiToken123456");
```

## Methods

### Responses

- Methods fetching entities to Nozbe Teams return `Promises`, which - if resolved - provide response from Nozbe Teams. The responses may provide more info than described.
- Methods adding entities to Nozbe Teams return `null`.

### `client.getLoggedUserData()`

Fetches the profile info

#### Response

- `name` - profile name
- `email` - profile email
- `time_zone` - timezone set for the profile

### `client.getTasks(projectId, [options])`

Fetches the tasks for the particular project.

#### Arguments

- `projectId` (string) - ID of the project to get tasks for
- `options` (optional)
  - `withCompleted` (boolean) - include completed tasks to the response

#### Response

- `id` - Task ID
- `name` - Task name
- `author_id` - ID of the creator of the task
- `project_id` - ID of the project the task is assigned to
- `created_at` - Timestamp for when the task was created
- `ended_at` - Timestamp for when the task was finished

### `client.addTask(taskName, [projectId, extra])`

Adds a task to the particular project

#### Arguments

- `taskName` (string) - Task name
- `projectId` (string)(optional) - ID of the project to which the task is added
  - If not given, task will be added to Single Tasks
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter)

### `client.updateTask(taskId, params, [extra])`

Updates the task

- `taskId` (string) - Id of the task to update
- `params` (object) - Parameters of the updated task. The parameters are optional:
  - `taskName` (string)(optional) - Updates the task name
  - `isCompleted` (bool)(optional) - Marks the task as completed/not completed
  - `isPriority` (bool)(optional) - Marks the task as a priority/non-priority
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter). Note: The extra parameter overrides `params`

### `client.getProjects([options])`

Fetches all projects created by the user

#### Arguments

- `options` (optional)
  - `withCompleted` (boolean) - include completed projects to the response

#### Response

- `id` - Project ID
- `name` - Project name
- `author_id` - ID of the creator of the project
- `is_open` - Indicates if the project is ongoing
- `team_id` - Team ID
- `created_at` - Timestamp for when the project was created
- `is_favorite` - Indicates if the project is set as favorite by the user
- `is_single_actions` - Indicates if the project is Single Tasks. There's only one Single Tasks project per account.

### `client.addProject(projectName, teamId, [extra])`

Adds new project. **For paid accounts only**.

#### Arguments

- `projectName` (string) - name of the added project
- `teamId` (string) - ID of the team the project is assigned to
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter)

### `client.updateProject(projectId, params, [extra])`

Updates the project

- `projectId` (string) - Id of the project to update
- `params` (object) - Parameters of the updated project. The parameters are optional:
  - `projectName` (string)(optional) - Updates the project name
  - `isCompleted` (bool)(optional) - Marks the project as completed/not completed
  - `isFavorite` (bool)(optional) - Marks the project as a favorite
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter). Note: The extra parameter overrides `params`

### `client.getComments(taskId)`

Fetches all comments for the particular task

#### Arguments

- `taskId` (string) - ID of the task for which the comments should be fetched

#### Response

- `id` - Comment ID
- `body` - Comment content
- `task_id` - ID of the task to which the comment belongs
- `author_id` - ID of the creator of the comment
- `created_at` - Timestamp for when the comment was created
- `edited_at` - Timestamp for when the project was edited
- `is_pinned` - Indicates if the comment is pinned to the top
- `is_deleted` - Indicates if the comment has been deleted

### `client.addComment(taskId, commentText, [extra])`

Adds comment to a particular task. Nozbe Teams renders comments in Markdown.

### `client.updateComment(commentId, params, [extra])`

Updates the comment

- `commentId` (string) - Id of the comment to update
- `params` (object) - Parameters of the updated comment. The parameters are optional:
  - `commentText` (string)(optional) - Updates the comment's text
  - `isDeleted` (bool)(optional) - Removes the comment. **Note:** It's irreversible
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter). Note: The extra parameter overrides `params`

#### Arguments

- `taskId` (string) - ID of the task to which the comment should be added
- `commentText` (string) - Text to add as a comment
- `extra` (object)(optional) - See [_the `extra` parameter_](#the-extra-parameter)

### `client.addAttachmentByFilesArray(taskId, commentText, files)`

Adds comment with attachments to a particular task.

#### Arguments

- `taskId` (string) - ID of the task to which the comment should be added
- `commentText` (string) - Text to add as a comment
- `files` ([File]) - Array of the HTML5 `File`s.

## The "escape hatch" methods

We don't document every single operation possible, but you still can pass an undocumented extra object without reverting to `fetch()` once this basic API wrapper is not sufficient. For advanced applies.

### `client.createRaw(collectionName, rawObject)`

Creates an arbitrary record in the particular collection.

#### Arguments

- `collectionName` (string) - Collection to which the record should be added (_tasks_, _projects_ etc.)
- `rawObject` (object) - POJO denoting the record to add

Example:

```js
await client.createRaw("tasks", {
  id: "randomTaskId123",
  name: "Create a new Task recrod", // this typo is here on purpose
  project_id: "theProjectId",
});
```

### `client.updateRaw(collectionName, rawObject)`

Updates the arbitrary record in the particular collection.

#### Arguments

- `collectionName` (string) - Collection to which the record should be updated (_tasks_, _projects_ etc.)
- `rawObject` (object) - POJO denoting the record to update. Should have the `id` key.

Example:

```js
await client.updateRaw("tasks", {
  id: "randomTaskId123",
  name: "Create a new Task record", // the typo is fixed now
});
```

### `client.deleteRaw(collectionName, id)`

Removes the arbitrary record in the particular collection.

- `collectionName` (string) - Collection in which the record should be removed (_tasks_, _projects_ etc.)
- `id` (string) - Record ID

Example:

```js
await client.deleteRaw("tasks", "randomTaskId123");
```

## The `extra` parameter

The `extra` object allows you to pass the undocumented parameters to the created entities without having to scrap your code and start from scratch with `createRaw()` once this basic API wrapper is not sufficient. For advanced applies.

```js
await client.addTask("A task name", "theProjectId", {
  extra: {
    responsible_id: "responsiblePersonId",
    ended_at: 2137000000,
  },
});
```
