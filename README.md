
## Usage
### Login, register, gestion des users
#### Register

```http
  POST /users
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Requis**               |
| `password`| `string` | **Requis**               |
| `role`| `string` | **Requis**  `user/tech/vandal` |

#### Login

```http
  POST /login
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Requis**               |
| `password`| `string` | **Requis**               |

#### Logout

```http
  POST /logout
```

#### Liste des users (JSON)

```http
  GET /users
```

### Gestion des escalators
#### Liste des escalators

```http
  GET /escalators
```

#### Statut d'un escalator

```http
  GET /escalator/:id
```

| Paramètre | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`   | `int` | **Requis** ID de l'Escalator              |


### Gestion des incidents
#### Création d'un incident

#### Fin d'un incident

#### Historique des incidents


### Gestion des maintenances
#### Création d'une maintenance



