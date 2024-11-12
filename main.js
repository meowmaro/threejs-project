import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';

function openNav() {
    if (document.getElementById('sideNav').className === 'sideNav')
      document.getElementById('sideNav').className = 'open';
    else document.getElementById('sideNav').className = 'sideNav';
  }