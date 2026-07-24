<<<<<<< HEAD
export function filterAssets(assets, searchText, statusFilter){
    const normalizedSearch = searchText.trim().toLowerCase();

    return assets.filter((asset) => {
        const matchesSearch =
            normalizedSearch.length === 0 ||
            asset.assetTag.toLowerCase().includes(normalizedSearch) ||
            asset.name.toLowerCase().includes(normalizedSearch) ||
            asset.category.toLowerCase().includes(normalizedSearch) ||
            asset.location.toLowerCase().includes(normalizedSearch)
        const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter

        return matchesSearch && matchesStatus
    });
}

export function countByStatus(assets, status){
    return assets.filter((asset) => asset.status === status).length
}
=======
export function filterAssets(assets, searchText, statusFilter) {
  const normalizedSearch = searchText.trim().toLowerCase();

  return assets.filter((asset) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      asset.assetTag.toLowerCase().includes(normalizedSearch) ||
      asset.name.toLowerCase().includes(normalizedSearch) ||
      asset.category.toLowerCase().includes(normalizedSearch) ||
      asset.location.toLowerCase().includes(normalizedSearch);

    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}

export function countByStatus(assets, status) {
  return assets.filter((asset) => asset.status === status).length;
}
>>>>>>> a2ba22e3d184f5cd9d97030666c810b5a4fc122d
