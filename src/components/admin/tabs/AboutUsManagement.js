import { useState, useEffect } from "react";
import { Plus, Edit, Eye, ChevronDown, X, Trash2, AlertTriangle } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUsHistory, createAboutUs, updateAboutUs, fetchCurrentAboutUs, deleteAboutUs } from "../../../redux/slices/adminSlice";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

function AboutUsManagement() {
  const dispatch = useDispatch();
  const { 
    aboutUsVersions, 
    isLoadingAboutUs, 
    aboutUsError, 
    isSubmittingAboutUs,
    currentAboutUs,
  } = useSelector((state) => state.admin);
  const [expandedId, setExpandedId] = useState(null);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const { addToast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVersion, setEditingVersion] = useState(null);
  const [formData, setFormData] = useState({
    title: 'About Us',
    content: '',
    mission: '',
    vision: '',
    core_values: '',
    team_description: ''
  });
  const [errors, setErrors] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingVersion, setDeletingVersion] = useState(null);

  useEffect(() => {
    dispatch(fetchAboutUsHistory());
    dispatch(fetchCurrentAboutUs());
  }, [dispatch]);

  const handleViewVersion = (version) => {
    setSelectedVersion(version);
    setIsViewing(true);
  };

  const isLatestVersion = (version) => {
    if (!currentAboutUs) return false;
    return version.id === currentAboutUs.id;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Please enter the title';
    } else if (formData.title.length > 200) {
      newErrors.title = 'The title cannot exceed 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Please enter the content';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'The content cannot exceed 1000 characters';
    }

    if (!formData.mission.trim()) {
      newErrors.mission = 'Please enter the mission';
    } else if (formData.mission.length > 500) {
      newErrors.mission = 'The mission cannot exceed 500 characters';
    }

    if (!formData.vision.trim()) {
      newErrors.vision = 'Please enter the vision';
    } else if (formData.vision.length > 500) {
      newErrors.vision = 'The vision cannot exceed 500 characters';
    }

    if (!formData.core_values.trim()) {
      newErrors.core_values = 'Please enter the core values';
    } else if (formData.core_values.length > 500) {
      newErrors.core_values = 'The core values cannot exceed 500 characters';
    }

    if (!formData.team_description.trim()) {
      newErrors.team_description = 'Please enter the team description';
    } else if (formData.team_description.length > 500) {
      newErrors.team_description = 'The team description cannot exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(createAboutUs(formData)).unwrap();
      addToast({
        type: 'success',
        message: 'Create new About Us version successfully!'
      });
      setIsCreating(false);
      setFormData({
        title: '',
        content: '',
        mission: '',
        vision: '',
        core_values: '',
        team_description: ''
      });
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'An error occurred while creating a new About Us version'
      });
    }
  };

  const handleEditClick = (version) => {
    if (!isLatestVersion(version)) {
      addToast({
        type: 'error',
        message: 'You can only edit the currently used version'
      });
      return;
    }
    setEditingVersion(version);
    setFormData({
      title: version.title,
      content: version.content,
      mission: version.mission,
      vision: version.vision,
      core_values: version.core_values,
      team_description: version.team_description
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
     await dispatch(updateAboutUs({
        id: editingVersion.id,
        data: formData
      })).unwrap();
      
      addToast({
        type: 'success',
        message: 'Update About Us successfully!'
      });
      setIsEditing(false);
      setEditingVersion(null);
      setFormData({
        title: '',
        content: '',
        mission: '',
        vision: '',
        core_values: '',
        team_description: ''
      });

      dispatch(fetchAboutUsHistory());
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'An error occurred while updating About Us'
      });
    }
  };

  const canDelete = () => {
    return aboutUsVersions?.length > 1;
  };

  const handleDeleteClick = (version) => {
    if (!canDelete()) {
      addToast({
        type: 'error',
        message: 'Cannot delete the only version'
      });
      return;
    }
    setDeletingVersion(version);
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAboutUs(deletingVersion.id)).unwrap();
      
      await dispatch(fetchCurrentAboutUs());
      
      addToast({
        type: 'success',
        message: 'Delete About Us version successfully!'
      });
      setIsDeleting(false);
      setDeletingVersion(null);

      dispatch(fetchAboutUsHistory());
    } catch (error) {
      addToast({
        type: 'error',
        message: error.message || 'An error occurred while deleting the version'
      });
    }
  };

  if (isLoadingAboutUs) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (aboutUsError) {
    return (
      <div className="p-6 text-center text-red-600">
        An error occurred while loading the About Us history: {aboutUsError.message}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">About Us Management</h2>
        <button
          onClick={() => {
            setIsCreating(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#98E9E9] text-gray-700 rounded-lg hover:bg-[#7CD5D5]"
        >
          <Plus size={20} />
          Add new version
        </button>
      </div>

      <div className="space-y-4">
        {aboutUsVersions?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No About Us version. Please add a new version!
          </div>
        ) : (
          aboutUsVersions?.map((version) => (
            <div 
              key={version.id} 
              className={`bg-white p-4 rounded-lg shadow-sm ${
                isLatestVersion(version) ? 'border-2 border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <button
                    onClick={() => setExpandedId(expandedId === version.id ? null : version.id)}
                    className="w-full flex justify-between items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-left">
                          Version {version.version} - {version.title}
                        </h3>
                        {isLatestVersion(version) && (
                          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            Used
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        Last updated: {format(new Date(version.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                        {' '}by {version.last_updated_by_name}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        expandedId === version.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedId === version.id && (
                    <div className="mt-4 space-y-2 text-gray-600">
                      <p><strong>Mission:</strong> {version.mission}</p>
                      <p><strong>Vision:</strong> {version.vision}</p>
                      <p><strong>Core values:</strong> {version.core_values}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleViewVersion(version)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="View detail"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => handleEditClick(version)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(version)}
                    className={`p-2 rounded-full ${
                      canDelete() 
                        ? 'text-red-600 hover:bg-red-50' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                    title={canDelete() ? 'Delete' : 'Cannot delete the only version'}
                    disabled={!canDelete()}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isViewing && selectedVersion && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsViewing(false);
              setSelectedVersion(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">
                  About Us Detail - Version {selectedVersion.version}
                </h2>
                <button
                  onClick={() => {
                    setIsViewing(false);
                    setSelectedVersion(null);
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Title</h3>
                  <p className="text-gray-600">{selectedVersion.title}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Content</h3>
                  <p className="text-gray-600">{selectedVersion.content}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Mission</h3>
                  <p className="text-gray-600">{selectedVersion.mission}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Vision</h3>
                  <p className="text-gray-600">{selectedVersion.vision}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Core values</h3>
                  <p className="text-gray-600">{selectedVersion.core_values}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Team description</h3>
                  <p className="text-gray-600">{selectedVersion.team_description}</p>
                </div>

                {selectedVersion.banner_image && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Banner image</h3>
                    <img 
                      src={selectedVersion.banner_image} 
                      alt="Banner"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}

                <div className="text-sm text-gray-500">
                  <p>Last updated: {format(new Date(selectedVersion.updated_at), 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
                  <p>Updated by: {selectedVersion.last_updated_by_name}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {isCreating && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsCreating(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">Add new About Us version</h2>
                <button
                  onClick={() => setIsCreating(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mission <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mission ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.mission && <p className="mt-1 text-sm text-red-500">{errors.mission}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vision <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.vision ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.vision && <p className="mt-1 text-sm text-red-500">{errors.vision}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Core values <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="core_values"
                    value={formData.core_values}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.core_values ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.core_values && <p className="mt-1 text-sm text-red-500">{errors.core_values}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="team_description"
                    value={formData.team_description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.team_description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.team_description && <p className="mt-1 text-sm text-red-500">{errors.team_description}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isEditing && editingVersion && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => setIsEditing(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b sticky top-0 bg-white">
                <h2 className="text-xl font-semibold">Add new About Us version</h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.title ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.content ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mission <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="mission"
                    value={formData.mission}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.mission ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.mission && <p className="mt-1 text-sm text-red-500">{errors.mission}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vision <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.vision ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.vision && <p className="mt-1 text-sm text-red-500">{errors.vision}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Core values <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="core_values"
                    value={formData.core_values}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.core_values ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.core_values && <p className="mt-1 text-sm text-red-500">{errors.core_values}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="team_description"
                    value={formData.team_description}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      errors.team_description ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                    }`}
                  />
                  {errors.team_description && <p className="mt-1 text-sm text-red-500">{errors.team_description}</p>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 min-w-[100px]"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {isDeleting && deletingVersion && canDelete() && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-[100]"
            onClick={() => {
              setIsDeleting(false);
              setDeletingVersion(null);
            }}
          />
          <div className="fixed inset-0 flex items-center justify-center z-[110] p-4">
            <div 
              className="bg-white rounded-lg w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="mb-4 text-xl font-medium text-center text-gray-900">
                  Confirm delete
                </h3>
                <p className="text-center text-gray-500">
                  Are you sure you want to delete version {deletingVersion.version}? 
                  {isLatestVersion(deletingVersion) && (
                    <span className="block mt-2 font-medium text-red-600">
                      Note: This is the version being used!
                    </span>
                  )}
                  This action cannot be undone.
                </p>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDeleting(false);
                      setDeletingVersion(null);
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={isSubmittingAboutUs}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={isSubmittingAboutUs}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {isSubmittingAboutUs ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Deleting...</span>
                      </>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AboutUsManagement;
