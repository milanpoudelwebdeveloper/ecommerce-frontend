import React from 'react'

//this form can be used both for category and sub-category

const CategoryCreateForm = ({ categoryCreate, setName, name, loading }) => {
  return (
    <>
      <form onSubmit={categoryCreate}>
        <div className="form-group">
          <label className="mb-3">Name</label>
          <input
            placeholder="Please enter the title"
            required
            autoFocus
            type="text"
            className="form-control"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="btn btn-outline-primary my-3"
            disabled={!name || loading}
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  )
}

export default CategoryCreateForm
