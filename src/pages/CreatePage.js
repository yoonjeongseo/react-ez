import BlogForm from "../components/BlogForm";

const CreatePage = ({ addToast }) => {
  return (
    <div>
      <BlogForm addToast={addToast}></BlogForm>
    </div>
  )
}

export default CreatePage;