const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');
const SessionController = require('../app/controllers/SessionController');
const authMiddleware = require('../app/middlewares/auth/authMiddleware');
const ArtistController = require('../app/controllers/ArtistController');
const ArtSessionController = require('../app/controllers/ArtSessionController');
const multer = require('multer');
const multerConfig = require('../config/uploads/multer');
const MusicController = require('../app/controllers/MusicController');
const AlbumController = require('../app/controllers/AlbumController');
const RelationshipAAM = require('../app/controllers/RelationshipAlbumMusicArtistController');
const users_like_musics = require('../app/controllers/users_like_musicsController');
const users_like_albuns = require('../app/controllers/users_like_albunsController');
const users_like_artists = require('../app/controllers/users_like_artistsController');
const SearchMethod = require('../utils/SearchMethod');

const upload = multer(multerConfig);

//routes of user
routes.post('/user', upload.single('avatar'), UserController.store);
routes.get('/user', UserController.index);
routes.delete('/user', authMiddleware, UserController.destroy);
routes.post('/login/user', SessionController.store);
routes.put(
    '/user',
    authMiddleware,
    upload.single('avatar'),
    UserController.update
);
routes.post('/files', upload.single('avatar'), (req, res) => {
    return res.json(req.file);
});
routes.get('/user/show', authMiddleware, UserController.show);

//routes of artist
routes.post('/artist', upload.single('avatar'), ArtistController.store);
routes.get('/artist', ArtistController.index);
routes.delete('/artist', authMiddleware, ArtistController.destroy);
routes.put(
    '/artist',
    authMiddleware,
    upload.single('avatar'),
    ArtistController.update
);
routes.post('/artist/info', authMiddleware, ArtistController.show);
routes.post('/login/artist', ArtSessionController.store);

//routes of musics
routes.post(
    '/music',
    authMiddleware,
    upload.array('info', 2),
    MusicController.store
);
routes.get('/musics', authMiddleware, MusicController.index);
routes.delete('/music', authMiddleware, MusicController.destroy);
routes.put(
    '/music',
    authMiddleware,
    upload.single('banner_path'),
    MusicController.update
);
routes.get('/music', authMiddleware, MusicController.show);

//routes of album
routes.post(
    '/album',
    authMiddleware,
    upload.single('banner'),
    AlbumController.store
);
routes.get('/album', AlbumController.index);
routes.delete('/album', authMiddleware, AlbumController.delete);
routes.put(
    '/album',
    authMiddleware,
    upload.single('banner'),
    AlbumController.update
);
routes.get('/album/show', AlbumController.show);

//routes of relationship

routes.post('/relationship/album/music', authMiddleware, RelationshipAAM.store);
routes.get('/relationship/album/music', RelationshipAAM.index);
routes.delete(
    '/relationship/album/music',
    authMiddleware,
    RelationshipAAM.destroy
);
routes.post('/album/music/unique', RelationshipAAM.show);

//routes of users_like_musics
routes.post('/users/musics', authMiddleware, users_like_musics.store);
routes.get('/users/musics', authMiddleware, users_like_musics.index);
routes.delete('/users/musics', authMiddleware, users_like_musics.destroy);

//routes of users_like_albuns

routes.post('/users/albuns', authMiddleware, users_like_albuns.store);
routes.get('/users/albuns', authMiddleware, users_like_albuns.index);
routes.delete('/users/albuns', authMiddleware, users_like_albuns.destroy);
routes.post('/users/albuns/show', authMiddleware, users_like_albuns.show);

//routes of users_like_artists

routes.post('/users/artists', authMiddleware, users_like_artists.store);
routes.get('/users/artists', authMiddleware, users_like_artists.index);
routes.delete('/users/artists', authMiddleware, users_like_artists.destroy);
routes.get('/users/artists/show', authMiddleware, users_like_artists.show);

//method search
routes.post('/search', authMiddleware, SearchMethod.index);
routes.get('/search', authMiddleware, SearchMethod.show);

//export
module.exports = routes;
