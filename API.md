# `@nozbe/teams-api` reference

> ⚠️ This package is still a WIP and the reference does not cover all the fields in responses. It gives a glimpse of what's possible, though.

## The `client`

The `client` object denotes the Nozbe Teams application. Create it using the top-level constructor exported by `@nozbe/teams-api`:

```js
import NozbeTeams from "@nozbe/teams-api";

const client = new NozbeTeams("fakeApiToken123456");
```

## Methods

All the methods return `Promises`, which - if resolved - provide response from Nozbe Teams.

The responses may provide more info than described.

### `client.getLoggedUserData()`

Fetches the profile info

#### Response

- `name` - profile name
- `email` - profile email
- `time_zone` - timezone set for the profile

### `client.getTasks(projectId, options)`

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

### `client.addTask(taskName, projectId)`

Adds a task to the particular project

#### Arguments

- `taskName` (string) - Task name
- `projectId` (string)(optional) - ID of the project to which the task is added
  - If not given, task will be added to Single Tasks

### `client.getProjects(options)`

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

### `client.addComment(taskId, commentText)`

Adds comment to a particular task. Nozbe Teams renders comments in Markdown.

#### Arguments

- `taskId` - ID of the task to which the comment should be added
- `commentText` - Text to add as a comment

### `client.addAttachmentByUrl(taskId, commentText, attachmentUrl, attachmentFileName)`

Adds comment with the attachment from the URL to a particular task.

#### Arguments

- `taskId` - ID of the task to which the comment should be added
- `commentText` - Text to add as a comment
- `attachmentUrl` - URL of the attachment file
- `attachmentFileName` - Name under which the attachment should be saved

## "Escape hatch" methods

We don't document every single operation possible, but you still can pass an undocumented extra object without reverting to `fetch()` once this basic API wrapper is not sufficient. For advanced applies.

### `client.createRaw(collectionName, rawObject)`

Creates an arbitrary record in the particular collection.

Arguments

- `collectionName` - Collection to which the record should be added (_tasks_, _projects_ etc.)
- `rawObject` - POJO denoting the record to add

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

Arguments

- `collectionName` - Collection to which the record should be updated (_tasks_, _projects_ etc.)
- `rawObject` - POJO denoting the record to update. Should have the `id` key.

Example:

```js
await client.updateRaw("tasks", {
  id: "randomTaskId123",
  name: "Create a new Task record", // the typo is fixed now
});
```

### `client.deleteRaw(collectionName, id)`

Removes the arbitrary record in the particular collection.

- `collectionName` - Collection in which the record should be removed (_tasks_, _projects_ etc.)
- `id` - Record ID

Example:

```js
await client.deleteRaw("tasks", "randomTaskId123");
```
