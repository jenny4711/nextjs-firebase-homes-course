export default function ImageUrlFormatter(imagePath:string){
  return `https://firebasestorage.googleapis.com/v0/b/fire-homes-course-8ca9e.firebasestorage.app/o/${encodeURIComponent(
  imagePath
)}?alt=media`
}



