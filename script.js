
document.addEventListener('DOMContentLoaded', function() {
    
   
    const carDetails = {
        "Lamborghini Sesto Elemento": {
            title: "Lamborghini Sesto Elemento",
            price: "$2,700,000",
            description: "Featured Product",
            fullDescription: "1/20 Lamborghini Sesto Elemento, the Gallardo-based, track only hypercar weapon as seen on Top Gear. This is the only UK-based car and belongs to a very impressive collection.",
            specs: {
                spec1: "Gearbox:	Manual, 6 Speed",
                spec2: "Drive Type:	All Wheel Drive",
                spec3: "Cylinders:	V10",
                spec4: "Max Power: 570 bhp @8000rpm"
            },
            features: [
                "Acceleration 0-100 km/h: 2.5 s",
                "Light Weight",
                "Top Speed:	240mph (387km/h)"
            ]
        },
        "Pagani Zonda F": {
            title: "Pagani Zonda F",
            price: "$10,000,000",
            description: "Premium Choice",
            fullDescription: "Production of the Zonda F was limited to 25 cars. It came equipped with an extra headlight and a new configuration of fog lights in the lower grille, new bodywork (revised front end, new rear spoiler, more aerodynamic vents all around) that improved the car's aerodynamics, and different side mirrors.",
            specs: {
                spec1: "Fuel System:	Multipoint Injection",
                spec2: "Cylinders:	V12",
                spec3: "Drive Type:	Rear Wheel Drive",
                spec4: "Gearbox:	Manual, 6 Speed"
            },
            features: [
                "Top Speed:	214 mph (344 km/h)",
                "Acceleration 0-62 Mph (0-100 kph):	3.6 s",
            ]
        },
        "Koenigsegg Agera RS": {
            title: "Koenigsegg Agera RS",
            price: "$2,500,000",
            description: "Popular Choice",
            fullDescription: "Agera RS enhancements include: advanced lightweight sound insulation, a front splitter optimized for the track, front winglets, side skirts, advanced dynamic underbody flap system and a dynamically active rear spoiler for added down force (now up to 450 kg at 250 km/h). The RS also features improved side air outlets behind the front wheels, increased power and a raised rpm limit.The Agera RS included options such as Koenigsegg's active self-levelling chassis package, 3G connected Pre-Active chassis setups, alternative aero packages, active sound cancellation and much more.",
            specs: {
                spec1: "Cylinders:	V8",
                spec2: "Gearbox: paddle-shift with auto shift mode, 7 Speed",
                spec3: "Dry-sump lubrication.",
                spec4: "Carbon fiber intake manifold with optimized intake tracts"
            },
            features: [
                "Acceleration 0-100 km/h (0-62 mph): 3 s",
                "Top Speed:	447 km/h (278 mph)",
                "Braking distance: 30.5 m (100-0 km/h)",
                "Max torque: 1100 Nm at 4000 rpm",
            ]
        }
    };

    
    if (!document.getElementById('carDetailModal')) {
        const modalHTML = `
        <div id="carDetailModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-white">
                    <div class="modal-header border-bottom border-danger">
                        <h5 class="modal-title" id="modalTitle">Card Details</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-7">
                                <img id="modalImage" src="" class="img-fluid" alt="Card Image">
                            </div>
                            <div class="col-md-5">
                                <div id="modalDetails">
                                    <h3 id="modalCarTitle" class="text-danger"></h3>
                                    <p id="modalDescription" class="text-white"></p>
                                    <p id="modalPrice" class="fs-4 text-danger fw-bold"></p>
                                    
                                    <h5 class="mt-4 border-bottom border-danger pb-2">SPECIFICATIONS</h5>
                                    <ul id="modalSpecs" class="list-unstyled">
                                    </ul>
                                    
                                    <h5 class="mt-4 border-bottom border-danger pb-2">FEATURES</h5>
                                    <ul id="modalFeatures" class="list-unstyled">
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer border-top border-danger">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" id="purchaseBtn">Purchase</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer.firstElementChild);
    }

    
    const carModal = new bootstrap.Modal(document.getElementById('carDetailModal'));
    
   
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        
        
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(255, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        
        card.addEventListener('click', function() {
            
            const cardTitle = this.querySelector('.card-title').textContent;
            const cardDetail = carDetails[cardTitle];
            
            if (cardDetail) {
               
                document.getElementById('modalCarTitle').textContent = cardDetail.title;
                document.getElementById('modalDescription').textContent = cardDetail.fullDescription;
                document.getElementById('modalPrice').textContent = cardDetail.price;
                
               
                const cardImage = this.querySelector('.card-img-top').src;
                document.getElementById('modalImage').src = cardImage;
                
               
                const specsList = document.getElementById('modalSpecs');
                specsList.innerHTML = '';
                for (const [key, value] of Object.entries(cardDetail.specs)) {
                    const specItem = document.createElement('li');
                    specItem.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}`;
                    specsList.appendChild(specItem);
                }
                
                
                const featuresList = document.getElementById('modalFeatures');
                featuresList.innerHTML = '';
                cardDetail.features.forEach(feature => {
                    const featureItem = document.createElement('li');
                    featureItem.innerHTML = `<i class="text-danger">•</i> ${feature}`;
                    featuresList.appendChild(featureItem);
                });
                
               
                document.getElementById('purchaseBtn').onclick = function() {
                    alert(`Thank you for purchasing ${cardDetail.title}!`);
                    carModal.hide();
                };
                
                
                carModal.show();
            }
        });
    });
    
    
    const modalElement = document.getElementById('carDetailModal');
    modalElement.addEventListener('show.bs.modal', function () {
        const modalContent = this.querySelector('.modal-content');
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-50px)';
        modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            modalContent.style.opacity = '1';
            modalContent.style.transform = 'translateY(0)';
        }, 50);
    });
});