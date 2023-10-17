import React, { useState, useEffect } from "react";

const sortProperties = (properties, column, sortOrder) => {
    return properties.sort((a, b) => {
      const valueA = column === 'price' ? parseFloat(a[column]) : a[column];
      const valueB = column === 'price' ? parseFloat(b[column]) : b[column];
  
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  const handleSort = (column, sortColumn, setSortColumn, sortOrder, setSortOrder) => {
    if (column === sortColumn) {
      const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newSortOrder);
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };
  
  const handleSearch = (properties, searchQuery, sortColumn, sortOrder) => {
    const filteredProperties = properties.filter((property) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const priceString = property.price ? property.price.toString() : '';
  
      return (
        (property.name && property.name.toLowerCase().includes(lowerCaseQuery)) ||
        (property.owner && property.owner.toLowerCase().includes(lowerCaseQuery)) ||
        (priceString && priceString.includes(lowerCaseQuery)) ||
        (property.description && property.description.toLowerCase().includes(lowerCaseQuery)) ||
        (property.category && property.category.toLowerCase().includes(lowerCaseQuery))
      );
    });
  
    const sortedProperties = sortProperties(filteredProperties, sortColumn, sortOrder);
    return sortedProperties;
  };
  
  export { sortProperties, handleSort, handleSearch };
  