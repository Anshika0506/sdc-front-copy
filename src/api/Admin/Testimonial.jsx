// /api/testimonials.js
import { publicApi, adminApi } from '../config';

const TESTIMONIALS_ENDPOINTS = {
  GET_ALL: '/public/testimonies/All',
  ADD: '/admin/testimonials/add',
  UPDATE: '/admin/testimonials/update',
  DELETE: '/admin/testimonials/delete'
};

// Public API - Get all testimonials
export const getAllTestimonials = async () => {
  try {
    const response = await publicApi.get(TESTIMONIALS_ENDPOINTS.GET_ALL);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch testimonials'
    };
  }
};

// Admin API - Add new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', testimonialData.name);
    formData.append('message', testimonialData.message);
    
    // Append image file if exists
    if (testimonialData.image && testimonialData.image instanceof File) {
      formData.append('image', testimonialData.image);
    }

    const response = await adminApi.post(TESTIMONIALS_ENDPOINTS.ADD, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add testimonial'
    };
  }
};

// Admin API - Update testimonial
export const updateTestimonial = async (id, testimonialData) => {
  try {
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', testimonialData.name);
    formData.append('message', testimonialData.message);
    
    // Append image file if exists (only if new image is uploaded)
    if (testimonialData.image && testimonialData.image instanceof File) {
      formData.append('image', testimonialData.image);
    }

    const response = await adminApi.put(`${TESTIMONIALS_ENDPOINTS.UPDATE}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to update testimonial'
    };
  }
};

// Admin API - Delete testimonial
export const deleteTestimonial = async (id) => {
  try {
    const response = await adminApi.delete(`${TESTIMONIALS_ENDPOINTS.DELETE}/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to delete testimonial'
    };
  }
};

// Bulk operations (if needed)
export const bulkDeleteTestimonials = async (ids) => {
  try {
    const deletePromises = ids.map(id => deleteTestimonial(id));
    const results = await Promise.allSettled(deletePromises);
    
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success);
    const failed = results.filter(r => r.status === 'rejected' || !r.value.success);
    
    return {
      success: failed.length === 0,
      deleted: successful.length,
      failed: failed.length,
      errors: failed.map(f => f.reason || f.value.error)
    };
  } catch (error) {
    console.error('Error bulk deleting testimonials:', error);
    return {
      success: false,
      error: 'Failed to bulk delete testimonials'
    };
  }
};