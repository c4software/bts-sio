```
table users {
    id int
    name text
}

table roles{
    id int
    name text
}

table role_user{
    user_id int [ref: > users.id]
    role_id int [ref: > roles.id]
}
```
