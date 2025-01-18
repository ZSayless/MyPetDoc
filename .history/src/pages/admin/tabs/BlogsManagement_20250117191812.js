import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { deleteBlog, updateBlogStatus } from "../../../redux/slices/adminSlice";
import { useTranslation } from "react-i18next";

function BlogsManagement() {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { t } = useTranslation();

  const handleDelete = (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(blogId));
    }
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
  };

  const handlePublish = (blogId) => {
    dispatch(updateBlogStatus({ blogId, status: "published" }));
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <input
        type="text"
        placeholder={t("admin.actions.search")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="..."
      />

      <table>
        <thead>
          <tr>
            <th>{t("admin.table.title")}</th>
            <th>{t("admin.table.author")}</th>
            <th>{t("admin.table.category")}</th>
            <th>{t("admin.table.status")}</th>
            <th>{t("admin.table.views")}</th>
            <th>{t("admin.table.publishDate")}</th>
            <th>{t("admin.table.actions")}</th>
          </tr>
        </thead>
        {/* ... table body */}
      </table>
    </div>
  );
}

export default BlogsManagement;
