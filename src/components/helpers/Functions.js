
export function loadS3Image(image, folder){
    var imageURL = 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/' + folder + '/' + image;
    return imageURL;
  }
  
export function loadS3Video(video, folder){
    var videoURL = 'https://majindonpatch-public.s3.eu-west-2.amazonaws.com/' + folder + '/' + video;
    return videoURL;
}