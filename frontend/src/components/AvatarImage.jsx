
export const AvatarImage = ({username, image}) => {
  return (
    <>
    <figure className="figure mx-auto">
        <img src={'/uploads/posts/' + post.image} className="figure-img img-fluid rounded pt-2" />
        <figcaption className="figure-caption text-center mx-auto">{username}</figcaption>
    </figure>
    </>
  )
}
