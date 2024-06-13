AFRAME.registerComponent('gesture-handler', {
    init: function () {
      this.startPosition = { x: 0, y: 0 };
      this.previousPosition = { x: 0, y: 0 };
      this.deltaPosition = { x: 0, y: 0 };
      this.startPinchDistance = 0;
      this.scaleFactor = 1;
      this.minScale = 0.04; // Escala mínima permitida
      this.maxScale = .2;   // Escala máxima permitida
      this.sensitivityFactor = 0.001; // Factor de sensibilidad para reducir la sensibilidad al escalar
  
      this.el.sceneEl.addEventListener('touchstart', this.onTouchStart.bind(this));
      this.el.sceneEl.addEventListener('touchmove', this.onTouchMove.bind(this));
    },
  
    onTouchStart: function (event) {
      if (event.touches.length === 2) {
        this.startPinchDistance = this.getPinchDistance(event.touches[0], event.touches[1]);
      } else {
        this.startPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        this.previousPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
    },
  
    onTouchMove: function (event) {
      if (event.touches.length === 2) {
        const currentPinchDistance = this.getPinchDistance(event.touches[0], event.touches[1]);
        // Aplicar un factor de atenuación para reducir la sensibilidad
        this.scaleFactor += (currentPinchDistance - this.startPinchDistance) * this.sensitivityFactor;
        // Aplicar límites de escala
        this.scaleFactor = Math.max(this.minScale, Math.min(this.scaleFactor, this.maxScale));
        this.el.object3D.scale.set(this.scaleFactor, this.scaleFactor, this.scaleFactor);
      } else {
        const currentPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        this.deltaPosition = {
          x: currentPosition.x - this.previousPosition.x,
          y: currentPosition.y - this.previousPosition.y
        };
  
        this.el.object3D.rotation.y += this.deltaPosition.x * 0.01;
        this.el.object3D.rotation.x += this.deltaPosition.y * 0.01;
  
        this.previousPosition = { x: currentPosition.x, y: currentPosition.y };
      }
    },
  
    getPinchDistance: function(touch1, touch2) {
      return Math.sqrt(
        Math.pow(touch1.clientX - touch2.clientX, 2) +
        Math.pow(touch1.clientY - touch2.clientY, 2)
      );
    }
  });