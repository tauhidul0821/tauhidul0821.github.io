// Family Tree JavaScript Functions

// Family Tree 1 (Mother's side - ancestor.json)
let ancestorData = null;
let nodeStates = {}; // Track expanded/collapsed state

// Family Tree 2 (Father's side - ancestor2.json)
let ancestor2Data = null;
let nodeStates2 = {}; // Track expanded/collapsed state for tree 2

// Load and render both family trees on page load
window.addEventListener('DOMContentLoaded', function() {
  loadFamilyTree();
  loadFamilyTree2();
});

// ============================================
// FAMILY TREE 1 - Mother's Side (ancestor.json)
// ============================================

async function loadFamilyTree() {
  try {
    const response = await fetch('js/ancestor.json');
    ancestorData = await response.json();
    renderFamilyTree();
  } catch (error) {
    document.getElementById('familyTree').innerHTML = 
      '<div class="tree-loading" style="color: #e74c3c;">Error loading family tree. Please try again later.</div>';
    console.error('Error loading ancestor data:', error);
  }
}

function renderFamilyTree() {
  const treeContainer = document.getElementById('familyTree');
  treeContainer.innerHTML = '';
  
  if (!ancestorData) return;
  
  // Create root node
  const rootNode = createTreeNode(ancestorData, 'root', true, nodeStates);
  treeContainer.appendChild(rootNode);
  
  // Check if tree needs horizontal scroll and add indicator
  setTimeout(() => {
    const container = treeContainer.closest('.family-tree-container');
    if (container.scrollWidth > container.clientWidth) {
      container.classList.add('has-scroll');
      // Center the tree initially
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, 100);
}

function expandAllNodes() {
  Object.keys(nodeStates).forEach(nodeId => {
    nodeStates[nodeId] = true;
    const childrenContainer = document.getElementById(`children-${nodeId}`);
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (childrenContainer && nodeElement) {
      const expandIcon = nodeElement.querySelector('.node-expand-icon');
      childrenContainer.classList.remove('collapsed');
      if (expandIcon) {
        expandIcon.classList.remove('collapsed');
        expandIcon.classList.add('expanded');
      }
    }
  });
  
  // Update scroll indicator and center the tree
  setTimeout(() => {
    const container = document.querySelector('#familyTree').closest('.family-tree-container');
    if (container.scrollWidth > container.clientWidth) {
      container.classList.add('has-scroll');
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, 100);
}

function collapseAllNodes() {
  Object.keys(nodeStates).forEach(nodeId => {
    if (nodeId !== 'root') { // Keep root expanded
      nodeStates[nodeId] = false;
      const childrenContainer = document.getElementById(`children-${nodeId}`);
      const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
      if (childrenContainer && nodeElement) {
        const expandIcon = nodeElement.querySelector('.node-expand-icon');
        childrenContainer.classList.add('collapsed');
        if (expandIcon) {
          expandIcon.classList.remove('expanded');
          expandIcon.classList.add('collapsed');
        }
      }
    }
  });
}

// ============================================
// FAMILY TREE 2 - Father's Side (ancestor2.json)
// ============================================

async function loadFamilyTree2() {
  try {
    const response = await fetch('js/ancestor2.json');
    ancestor2Data = await response.json();
    renderFamilyTree2();
  } catch (error) {
    document.getElementById('familyTree2').innerHTML = 
      '<div class="tree-loading" style="color: #e74c3c;">Error loading family tree. Please try again later.</div>';
    console.error('Error loading ancestor2 data:', error);
  }
}

function renderFamilyTree2() {
  const treeContainer = document.getElementById('familyTree2');
  treeContainer.innerHTML = '';
  
  if (!ancestor2Data || !ancestor2Data.families) return;
  
  // Create a wrapper for multiple family roots
  const familiesWrapper = document.createElement('div');
  familiesWrapper.className = 'tree-node-children';
  familiesWrapper.style.marginTop = '0';
  
  // Create nodes for each family
  ancestor2Data.families.forEach((family, index) => {
    const familyNode = createTreeNode(family, `family-${index}`, false, nodeStates2);
    familiesWrapper.appendChild(familyNode);
  });
  
  treeContainer.appendChild(familiesWrapper);
  
  // Check if tree needs horizontal scroll and add indicator
  setTimeout(() => {
    const container = treeContainer.closest('.family-tree-container');
    if (container.scrollWidth > container.clientWidth) {
      container.classList.add('has-scroll');
      // Center the tree initially
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, 100);
}

function expandAllNodes2() {
  Object.keys(nodeStates2).forEach(nodeId => {
    nodeStates2[nodeId] = true;
    const childrenContainer = document.getElementById(`children-${nodeId}`);
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (childrenContainer && nodeElement) {
      const expandIcon = nodeElement.querySelector('.node-expand-icon');
      childrenContainer.classList.remove('collapsed');
      if (expandIcon) {
        expandIcon.classList.remove('collapsed');
        expandIcon.classList.add('expanded');
      }
    }
  });
  
  // Update scroll indicator and center the tree
  setTimeout(() => {
    const container = document.querySelector('#familyTree2').closest('.family-tree-container');
    if (container.scrollWidth > container.clientWidth) {
      container.classList.add('has-scroll');
      container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
    }
  }, 100);
}

function collapseAllNodes2() {
  Object.keys(nodeStates2).forEach(nodeId => {
    nodeStates2[nodeId] = false;
    const childrenContainer = document.getElementById(`children-${nodeId}`);
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (childrenContainer && nodeElement) {
      const expandIcon = nodeElement.querySelector('.node-expand-icon');
      childrenContainer.classList.add('collapsed');
      if (expandIcon) {
        expandIcon.classList.remove('expanded');
        expandIcon.classList.add('collapsed');
      }
    }
  });
}

// ============================================
// SHARED UTILITY FUNCTIONS
// ============================================

function createTreeNode(person, nodeId, isExpanded = false, stateStore) {
  // Initialize state if not exists
  if (!(nodeId in stateStore)) {
    stateStore[nodeId] = isExpanded;
  }

  const nodeDiv = document.createElement('div');
  nodeDiv.className = 'tree-node';
  nodeDiv.dataset.nodeId = nodeId;

  // Create node content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'tree-node-content';
  
  const nameDiv = document.createElement('div');
  nameDiv.className = 'tree-node-name';
  nameDiv.textContent = person.name;
  
  // Add "also known as" if exists
  if (person.also_known_as) {
    nameDiv.textContent += ` (${person.also_known_as})`;
  }
  
  contentDiv.appendChild(nameDiv);

  // Add note if exists (optional - currently not showing to keep it clean)
  // if (person.note) {
  //   const noteDiv = document.createElement('div');
  //   noteDiv.className = 'tree-node-note';
  //   noteDiv.textContent = person.note;
  //   contentDiv.appendChild(noteDiv);
  // }

  nodeDiv.appendChild(contentDiv);

  // Check if person has children
  const hasChildren = checkHasChildren(person);
  
  if (hasChildren) {
    contentDiv.classList.add('has-children');
    
    // Add expand/collapse icon
    const expandIcon = document.createElement('div');
    expandIcon.className = `node-expand-icon ${stateStore[nodeId] ? 'expanded' : 'collapsed'}`;
    expandIcon.onclick = (e) => {
      e.stopPropagation();
      toggleNode(nodeId, stateStore);
    };
    contentDiv.appendChild(expandIcon);
    
    // Create children container
    const childrenContainer = document.createElement('div');
    childrenContainer.className = `tree-node-children ${stateStore[nodeId] ? '' : 'collapsed'}`;
    childrenContainer.id = `children-${nodeId}`;
    
    // Handle children from first wife
    if (person.children_with_first_wife) {
      const children = person.children_with_first_wife.children;
      renderChildren(children, childrenContainer, `${nodeId}-fw`, stateStore);
    }
    
    // Handle direct children array
    if (person.children && Array.isArray(person.children)) {
      renderChildren(person.children, childrenContainer, nodeId, stateStore);
    }
    
    // Handle children from second wife
    if (person.children_with_second_wife) {
      const children = person.children_with_second_wife.children;
      renderChildren(children, childrenContainer, `${nodeId}-sw`, stateStore);
    }
    
    nodeDiv.appendChild(childrenContainer);
  }

  return nodeDiv;
}

function checkHasChildren(person) {
  if (person.children && Array.isArray(person.children) && person.children.length > 0) {
    return true;
  }
  if (person.children_with_first_wife && person.children_with_first_wife.children && 
      person.children_with_first_wife.children.length > 0) {
    return true;
  }
  if (person.children_with_second_wife && person.children_with_second_wife.children && 
      person.children_with_second_wife.children.length > 0) {
    return true;
  }
  return false;
}

function renderChildren(children, container, parentId, stateStore) {
  if (!children || children.length === 0) return;
  
  children.forEach((child, index) => {
    const childId = `${parentId}-${index}`;
    const childNode = createTreeNode(child, childId, false, stateStore);
    container.appendChild(childNode);
  });
}

function toggleNode(nodeId, stateStore) {
  stateStore[nodeId] = !stateStore[nodeId];
  const isExpanded = stateStore[nodeId];
  
  const childrenContainer = document.getElementById(`children-${nodeId}`);
  const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
  const expandIcon = nodeElement.querySelector('.node-expand-icon');
  
  if (childrenContainer) {
    if (isExpanded) {
      childrenContainer.classList.remove('collapsed');
      expandIcon.classList.remove('collapsed');
      expandIcon.classList.add('expanded');
      
      // Scroll the expanded node into view after a brief delay
      setTimeout(() => {
        const container = nodeElement.closest('.family-tree-container');
        const nodeRect = nodeElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Check if node is out of view
        if (nodeRect.left < containerRect.left || nodeRect.right > containerRect.right) {
          nodeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        
        // Update scroll indicator
        if (container.scrollWidth > container.clientWidth) {
          container.classList.add('has-scroll');
        }
      }, 100);
    } else {
      childrenContainer.classList.add('collapsed');
      expandIcon.classList.remove('expanded');
      expandIcon.classList.add('collapsed');
    }
  }
}
