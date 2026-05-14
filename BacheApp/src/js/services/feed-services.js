/* ═══════════════════════════════════════════
   FEED SERVICES — llamadas al backend
   TODO: reemplazar mocks con fetch() reales
══════════════════════════════════════════ */

// GET — traer todos los reportes
export async function getReports() {
    // TODO: return await fetch('/api/reports').then(r => r.json())
    return [];
}

// POST — crear nuevo reporte
export async function postReport(data) {
    // TODO: return await fetch('/api/reports', {
    //     method: 'POST',
    //     body: JSON.stringify(data)
    // }).then(r => r.json())
    return null;
}

// PATCH — actualizar estado de reporte
export async function updateReport(id, data) {
    // TODO: return await fetch(`/api/reports/${id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify(data)
    // }).then(r => r.json())
    return null;
}

// DELETE — eliminar reporte
export async function deleteReportAPI(id) {
    // TODO: return await fetch(`/api/reports/${id}`, {
    //     method: 'DELETE'
    // })
    return null;
}