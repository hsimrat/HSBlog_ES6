const form = document.querySelector('#new-post-form');
const postContainer = document.querySelector('#blog-posts');

if (form && postContainer) {
  // Display posts dynamically on the page
  const displayPosts = (posts) => {
    postContainer.innerHTML = posts
      .map(({ title, content }) => `
        <article class="post">
          <h2>${title}</h2>
          <p>${content}</p>
        </article>
      `)
      .join('');
  };

  // Fetch and display all posts
  async function fetchPosts() {
    try {
      const response = await fetch('http://localhost:3001/api/posts');

      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.status}`);
      }

      const posts = await response.json();
      displayPosts(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to load posts. Please check the server.');
    }
  }

  // Handle form submissions
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = form.elements['post-title'].value.trim();
    const content = form.elements['post-content'].value.trim();

    if (title && content) {
      try {
        const response = await fetch('http://localhost:3001/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
          throw new Error(`Error creating post: ${response.status}`);
        }

        form.reset();
        fetchPosts(); // Refresh post list
      } catch (error) {
        console.error('Error creating post:', error);
        alert('Failed to create post. Please try again.');
      }
    } else {
      alert('Both title and content are required!');
    }
  });

  // Initial fetch to load posts
  fetchPosts();
} else {
  console.warn('Form or post container not found.');
}
