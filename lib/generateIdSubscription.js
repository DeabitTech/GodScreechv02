const generateId = (idUser,idArtist) => (idUser > idArtist ? idUser+idArtist:idArtist+idUser)

export default generateId;