const deletePostHandler = async function(event) {
    event.preventDefault();
    const postId = document.getElementById('post-id')
    fetch('/api/post' + postId.value, {
        method: 'delete'
    })
    .then(function() {
        document.location.replace("/dasboard");
    })
    .catch(err => console.log(err))
}

document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);