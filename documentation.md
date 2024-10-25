# API - Endpoint Documentation

> ## /search
>
> **Method:** `GET`
> Endpoint: `http://localhost:3000/api/search?letters=${encodeURIComponent(query)}&table=${"words"}`
> Description: _Searching for words that can be created by the ({query}) `letters`-query in the ({table}) `words`-table_
>
> Query Parameters:
> `letters`: _string_ (input from user in the search form)
> `table`: _string_ (name of the data-table to get words that can me created by `letters`)
>
> Responses: `success: true`
>
> ```json
> {
>   "words": [
>     {
>       "id": 32955,
>       "word": "gris",
>       "value": 5
>     },
>     {
>       "id": 31553,
>       "word": "gir",
>       "value": 4
>     },
>     {
>       "id": 83312,
>       "word": "ris",
>       "value": 3
>     },
>     {
>       "id": 88522,
>       "word": "sig",
>       "value": 4
>     },
>     {
>       "id": 89014,
>       "word": "sir",
>       "value": 3
>     },
>     {
>       "id": 43699,
>       "word": "is",
>       "value": 2
>     },
>     {
>       "id": 88325,
>       "word": "si",
>       "value": 2
>     }
>   ]
> }
> ```
>
> Response: `success: false`
>
> ```json
> {
>   "words": []
> }
> ```
>
> ## /add-word
>
> **Methods:** `POST`
> Endpoint: `/api/add-word`
> Description: _Adding a word via the `/api/add-word` endpoint will add a user-input word to the `community-words` table_
>
> Body:
>
> ```json
> {
>   "word": "newword",
>   "normalized_word": "denorww"
> }
> ```
>
> Response: `success: true`
>
> ```json
> {
>   "id": 60,
>   "word": "anewword",
>   "normalized_word": "adenorww",
>   "word_value": 0,
>   "reports": 0,
>   "up_votes": 0,
>   "down_votes": 0,
>   "score": 0,
>   "status": "pending",
>   "created_at": "2024-10-25T17:12:16.030Z"
> }
> ```
>
> Response: `success: false`
>
> ```json
> {
>   "success": false,
>   "message": "User has to be signed in to add a word to the database"
> }
> ```
>
> ## /admin
>
> **Methods:** `POST`
> Endpoint: `/api/admin`
>
> Description: _Checking if a user is the administrator_ - Setting up admin roles is done [here](https://dashboard.clerk.com/apps/app_2l3rArZrugknLY4j4vTHvVebd8O/instances/ins_2l3rB4y861a8WdjBJwxTs6lhFwM/users/user_2lpJ2Swoyz7ncmq7o2fZemvG2Gw#:~:text=org%3Awfh_admin-,User%20metadata,-View%20and%20edit). And you can read more about roles on [Clerks website](https://clerk.com/docs/users/overview?_gl=1*1rhzia4*_gcl_au*MjA3MTcyNDQ1Mi4xNzI1ODcwODk3*_ga*NjAwNzgzMjAxLjE3MTgyODM1NDk.*_ga_1WMF5X234K*MTcyOTg3Nzc1MC4xOS4xLjE3Mjk4Nzc3NjkuMC4wLjA.#custom-user-metadata)
>
> Body: {}
>
> Response: `success: true`
>
> ```json
> {
>   "isAdmin": true
> }
> ```
>
> Response: `success: false`
>
> ```bash
>  > POST `http://localhost:3000/api/admin` *forbidden*
> ```
>
> **Methods:** `DELETE`
> Endpoint: `/api/admin?table=${table}`
>
> Description: _Deleting a single row (word and related data) from (any) `table`._
>
> Query Parameters:
> `table`: _string_ - (table can be any table making DELETE actions easy to set up)
>
> Response: `success: true`
>
> ```json
> {
>   "created_at": "2024-10-25T16:42:29.102Z",
>   "down_votes": 0,
>   "id": 52,
>   "normalized_word": "iikknntwyy",
>   "reports": 0,
>   "score": 0,
>   "status": "pending",
>   "up_votes": 0,
>   "word": "tinkywinky",
>   "word_value": 0
> }
> ```
>
> ## /community-words
>
> **Methods:** `POST`
> Endpoint: `/api/community-words`
>
> Description: _Authenticated users can vote on words in the `community-words` table to make them eligible in the `/api/search` results by achieving `status: approved`_ >> _This is an example of an `upVote`_
>
> Body:
>
> ```json
> {
>   "wordId": 40,
>   "voteType": "upVote"
> }
> ```
>
> Response: `success: true`
>
> ```json
> {
>   "updatedWord": {
>     "id": 40,
>     "word": "word",
>     "normalized_word": "dorw",
>     "word_value": 0,
>     "reports": 0,
>     "up_votes": 1,
>     "down_votes": 0,
>     "score": 1,
>     "status": "pending",
>     "created_at": "2024-10-25T13:40:01.603Z"
>   }
> }
> ```
>
> **Methods:** `GET`
> Endpoint: `http://localhost:3000/api/community-words`
>
> Description: _Fetching an array of all the word objects in the `community-words` table_
>
> Body: {}
>
> Responses: `success: true`
>
> ```json
> {
>   "communityWords": [
>     {
>       "id": 40,
>       "word": "word",
>       "normalized_word": "dorw",
>       "word_value": 0,
>       "reports": 0,
>       "up_votes": 1,
>       "down_votes": 0,
>       "score": 1,
>       "status": "pending",
>       "created_at": "2024-10-25T13:40:01.603Z"
>     }
>   ]
> }
> ```
>
> Response: `success: false`
>
> ```json
> {
>   "success": false,
>   "message": "Failed to add vote"
> }
> ```
>
> ## /report
>
> **Methods:** `POST`
> Endpoint: `http://localhost:3000/api/report`
>
> Description: \*Use the `/report` api to add a report to a specific word by `table` and `id`
>
> Body:
>
> ```json
> {
>   "word": "bord"
> }
> ```
>
> Response: `success: true`
>
> ```json
> {
>   "message": "Reported word as not usable: bord"
> }
> ```
>
> Response: `success: false`
>
> ```json
> {
>   "error": "Word not found"
> }
> ```
>
> ```json
> {
>   "error": "Word already reported by user or not found"
> }
> ```
>
> ```json
> {
>   "error": "Word is required"
> }
> ```
>
> **Methods:** `GET`
> Endpoint: `http://localhost:3000/api/report?userId=${userId}`
>
> Description: _Generates an individual list of reported words by `user_id`_
>
> Query parameter:
> `userId`: _any_ - (makes sure a user only deletes it´s reported words)
>
> Responses: `success: true`
>
> ```json
> {
>   "userReports": [
>     {
>       "word": "bord"
>     }
>   ]
> }
> ```
>
> Response: `success: false`
>
> ```json
> {
>   "userReports": []
> }
> ```
>
> **Methods:** `DELETE`
> Endpoint: `http://localhost:3000/api/report?userId=${userId}`
>
> Description: _Deleting user-specific reports, this does not effect the database, only the user-specific databases `user-reports`_
>
> Body: {}
>
> Response: `success: true`
>
> ```json
> {
>   "id": 23,
>   "userId": "user_**************",
>   "wordId": 40709,
>   "reportedAt": "2024-10-25T18:07:15.310Z"
> }
> ```
>
> ## /saol
>
> **Methods:** `POST`
> Endpoint: `/api/saol`
>
> Description: _Filtering the SAOL Swedish dictionary from unusable words and insert them into a database_ - This action takes hours, unless you write a script or run it from the front end, this file wont effect you.
>
> Body: {}
>
> Response: `success: true` > `123.598` _words will be filtered and put into your databadse_
>
> ## /update-word-value (admin)
>
> **Methods:** `POST`
> Endpoint: `/api/update-word-value`
>
> Description: _If words in your `words`-table has `value` = 0, this route will locate them and add up the sum of letters to the correct value. This actions could take a long time if you have many words that lacks `value`_
>
> Body: {}
>
> Response: `success: true`
>
> ```bash
> Update completed,  0 was updated!
> ```
>
> ```text
> Word value updated successfully
> ```
>
> ## /user-votes
>
> **Methods:** `POST`
> Endpoint: `/api/user-vote`
>
> Description: _Authenticated users can vote on words in the `community-words` table to make them eligible in the `/api/search` results by achieving `status: approved`_
>
> Body:
>
> ```json
> {
>   "userId": "user_************",
>   "wordId": 41,
>   "voteValue": 1
> }
> ```
>
> Response: `success: true`
>
> ```json
> {
>   "response": {
>     "success": true,
>     "message": "Vote has been registered!"
>   }
> }
> ```
>
> **Methods:** `GET`
> Endpoint: `http://localhost:3000/api/user-votes?wordId=${wordId}&userId=${userId}`
>
> Description: _Fetching the `vote_value` is needed to limit the amount of votes a specific user has on a specific word._
>
> Query Parameters:
> `wordId`: number - (word*id of the word reciving the vote)
> `userId` : any - (connecting the vote to its voter, enables the user to change its 1 vote but not add a second vote)"(\_its possible there is a more typesafe way to implement this*)"
>
> Response: `success: true`
>
> ```json
> {
>   "currentVoteValue": 0
> }
> ```
>
> _Did you not find what you were looking form, let me know by commenting what you wanted to achive but couldnt!_
