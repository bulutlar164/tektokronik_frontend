// reportService.js

const apiBase = "http://localhost:8080/reports";

export default {
  // Fetch a report by ID
  getReport(reportId) {
    return fetch(`${apiBase}/${reportId}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching report:', error);
      });
  },

  // Create a new report
  createReport(reportData) {
    return fetch(apiBase, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error creating report:', error);
      });
  },

  // Update a report status to 'işlemde'
  interveneReport(reportId) {
    return fetch(`${apiBase}/${reportId}`, {
      method: 'POST',
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error intervening report:', error);
      });
  },

  // Update an existing report
  updateReport(reportId, reportData) {
    return fetch(`${apiBase}/${reportId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData),
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error updating report:', error);
      });
  },

  // Delete a report
  deleteReport(reportId) {
    return fetch(`${apiBase}/${reportId}`, {
      method: 'DELETE',
    }).catch(error => {
      console.error('Error deleting report:', error);
    });
  },

  // Fetch all reports
  getAllReports() {
    return fetch(apiBase)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }
};
