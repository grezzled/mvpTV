
# MVP TV 
### NodeJS -  HTML - CSS - JavaScript

This represents the initial version of an upcoming platform (CineSeek) for searching Movies/TV Series. Users can search, compare, discover similar options, and track their favorites.

### Educational project 
#### NodeJS - HTML - CSS - JavaScript

Since this is an educational project, our team is constrained to using only Node.js in the backend without incorporating any frameworks (eg: `express`). Consequently, creating the routes and API endpoints, as well as making the directory `public` accessible with its included files while ensuring secure transfers, posed a noteworthy challenge. 

Feel free to examine the implemented logic within the `utils` folder to get an understanding of our approach.


## API Reference

#### Get latest movies

```http
  GET /api/movies/now-playing?page=${page}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Optional**. page number to fetch |

#### Get popular movies 

```http
  GET /api/movies/popular?page=${page}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Optional**. page number to fetch |

#### Get top rated movies 

```http
  GET /api/movies/top_rated?page=${page}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Optional**. page number to fetch |

#### Get upcoming movies 

```http
  GET /api/movies/upcoming?page=${page}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Optional**. page number to fetch |

#### Get movies by a search query 

```http
  GET /api/movies/search?query=${query}&page=${page}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. search query |
| `page`      | `number` | **Optional**. page number to fetch |

#### Get movie by id

```http
  GET /api/movies/movie?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## Installation

Install MVP TV with npm

```bash
  git clone https://github.com/grezzled/mvpTV
  cd mvpTV
  npm install
```

Start the project
```bash
npm start
```
## Collaborators

- [Akram Mhamdi](https://github.com/akram37)
- [Soufiane Belchhab](https://github.com/grezzled)
- [Brahim Elkaceh](https://github.com/brahimelkaceh)
- [Walid Bouhsin](https://github.com/WalidBouhsin9)

