const deletePostHandler = async (event) => {
    event.preventDefault();
    const postId = document.getElementById('post-id')
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    })
    .then(function() {
        document.location.replace('/dasboard');
    })
    .catch(err => console.log(err))
}

document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);