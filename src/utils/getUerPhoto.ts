const getUserPhoto = (photo: string) => {
  if (photo.includes("default-photo")) {
    return `/images/${photo}`;
  } else {
    return photo;
  }
};

export default getUserPhoto;
