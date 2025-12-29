import { Component, EventEmitter, Input, Output, signal, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessInfo } from '../../templates/template.model';
import { BusinessDataService } from '../../templates/business-data.service';

@Component({
  selector: 'app-template-preview-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './template-preview-modal.html',
  styleUrl: './template-preview-modal.scss',
})
export class TemplatePreviewModalComponent implements OnInit {
  @Input() template: any;
  @Input() businessInfo: BusinessInfo | null = null;
  @Output() close = new EventEmitter<void>();

  @ViewChild('modalBody') modalBodyContainer!: ElementRef;

  // E-commerce state
  protected cart = signal<any[]>([]);
  protected isLoggedIn = signal(false);
  protected searchQuery = signal('');

  // Real Estate Mock Data & State
  protected properties = [
    {
      id: 1,
      title: 'Villa Moderna en la Costa',
      price: 4500000,
      location: '123 Ocean Drive, Beverly Hills',
      beds: 4,
      baths: 5,
      area: 400,
      type: 'Casa', // Casa, Depa
      tag: 'EN VENTA',
      tagClass: 'status-tag', // default
      imageClass: 'villa'
    },
    {
      id: 2,
      title: 'Penthouse Ejecutivo',
      price: 3200000,
      location: '500 Park Avenue, Manhattan',
      beds: 3,
      baths: 2,
      area: 250,
      type: 'Depa',
      tag: 'NUEVO',
      tagClass: 'status-tag', // could add specfic classes if needed
      imageClass: 'penthouse'
    },
    {
      id: 3,
      title: 'Residencia Familiar',
      price: 1850000,
      location: '88 Pine Valley, Suburbs',
      beds: 5,
      baths: 4,
      area: 350,
      type: 'Casa',
      tag: 'OFERTA',
      tagClass: 'status-tag',
      imageClass: 'house'
    }
  ];
  protected filteredProperties = signal(this.properties);
  protected searchLoading = signal(false);
  protected favorites = signal<Set<number>>(new Set());
  protected visitScheduled = signal(false);

  // Mock interactive states
  protected cartCount = signal(0);
  protected activeTab = signal('home');
  protected activePropertyId = signal<number | null>(null);
  protected formSubmitted = signal(false);
  protected showTeam = signal(false);

  constructor(private businessDataService: BusinessDataService) { }

  ngOnInit(): void {
    // Si no se pasa businessInfo como Input, intentar obtenerlo del servicio
    if (!this.businessInfo) {
      this.businessInfo = this.businessDataService.getBusinessInfo();
    }
  }

  // Methods for interactivity
  addToCart(product: any = null) {
    if (!product) {
      // Fallback for existing buttons if not updated yet
      product = { name: 'Vino Premium', price: 45.00, image: '/assets/products/wine_red_1765775777593.png' };
    }
    this.cart.update(items => [...items, product]);
    this.cartCount.set(this.cart().length);
  }

  removeFromCart(index: number) {
    this.cart.update(items => items.filter((_, i) => i !== index));
    this.cartCount.set(this.cart().length);
  }

  get cartTotal() {
    return this.cart().reduce((total, item) => total + item.price, 0);
  }

  login() {
    this.formSubmitted.set(true);
    // Simulate API call
    setTimeout(() => {
      this.isLoggedIn.set(true);
      this.formSubmitted.set(false);
      this.setTab('home');
    }, 1500);
  }

  private scrollToTop() {
    if (this.modalBodyContainer?.nativeElement) {
      this.modalBodyContainer.nativeElement.scrollTop = 0;
    }
  }

  setTab(tab: string) {
    this.activeTab.set(tab);
    // Reset property view when switching tabs in real estate
    if (tab === 'home') this.activePropertyId.set(null);
    this.scrollToTop();
  }

  // Real Estate Methods
  handleSearch(location: string, type: string, price: string) {
    this.searchLoading.set(true);
    setTimeout(() => {
      let results = this.properties;

      // Simple mock filtering
      if (location) {
        results = results.filter(p => p.location.toLowerCase().includes(location.toLowerCase()));
      }
      if (type && type !== 'Todos') {
        results = results.filter(p => p.type === type);
      }
      // Mock price filter logic could go here

      this.filteredProperties.set(results);
      this.searchLoading.set(false);
      this.scrollToTop();
    }, 800);
  }

  toggleFavorite(event: Event, id: number) {
    event.stopPropagation(); // Prevent card click
    this.favorites.update(favs => {
      const newFavs = new Set(favs);
      if (newFavs.has(id)) newFavs.delete(id);
      else newFavs.add(id);
      return newFavs;
    });
  }

  scheduleVisit() {
    this.visitScheduled.set(true);
    setTimeout(() => this.visitScheduled.set(false), 3000);
  }

  viewProperty(id: number) {
    this.activePropertyId.set(id);
    this.activeTab.set('detail');
    this.scrollToTop();
  }

  submitForm() {
    this.formSubmitted.set(true);
    setTimeout(() => this.formSubmitted.set(false), 3000);
  }

  showTeamPage() {
    this.showTeam.set(true);
    this.activeTab.set('team');
    this.scrollToTop();
  }

  // Farma Care State
  protected healthTab = signal('home'); // home, category, product, cart, account, prescription
  protected healthCart = signal<any[]>([]);
  protected healthActiveCategory = signal('Medicamentos');
  protected healthSelectedProduct = signal<any>(null);
  protected healthChatOpen = signal(false);
  protected chatMessages = signal<{ text: string, sender: 'user' | 'pharmacist', time: string }[]>([]);
  protected chatInput = signal('');
  protected isPharmacistTyping = signal(false);
  protected healthSearchQuery = signal('');
  protected healthSearchResults = signal<any[]>([]);
  protected healthSearchPerformed = signal(false);

  protected healthProducts = [
    {
      id: 101,
      name: 'Paracetamol 500mg',
      brand: 'Genérico',
      desc: 'Caja x 20 tabletas',
      price: 12.99,
      category: 'Medicamentos',
      image: 'assets/realestate-bg-main.png', // Temporary fallback or use the real one if I find it
      // actually I should use the one I moved: assets/products/health_paracetamol.png
      imageType: 'img',
      imageSrc: '/assets/products/health_paracetamol.png',
      bgClass: 'med-icon'
    },
    {
      id: 102,
      name: 'Multivitamínico Plus',
      brand: 'VitaLife',
      desc: 'Frasco x 60 cápsulas',
      price: 25.50,
      category: 'Vitaminas',
      image: '🌿',
      imageType: 'img',
      imageSrc: '/assets/products/health_vitamin.jpg',
      offer: '-15%',
      bgClass: 'med-icon'
    },
    {
      id: 103,
      name: 'Protector Solar SPF50',
      brand: 'DermaCare',
      desc: 'Tubo 200ml',
      price: 18.75,
      category: 'Cuidado Personal',
      image: '🧴',
      imageType: 'img',
      imageSrc: '/assets/products/health_sunscreen.jpg',
      bgClass: 'med-icon'
    },
    {
      id: 104,
      name: 'Kit Primeros Auxilios',
      brand: 'CuraPlus',
      desc: 'Completo',
      price: 35.00,
      category: 'Primeros Auxilios',
      image: '🩹',
      imageType: 'img',
      imageSrc: '/assets/products/health_firstaid.jpg',
      bgClass: 'med-icon'
    },
    {
      id: 105,
      name: 'Ibuprofeno 400mg',
      brand: 'Genérico',
      desc: 'Caja x 10 cápsulas blandas',
      price: 8.50,
      category: 'Medicamentos',
      image: '💊',
      imageType: 'img',
      imageSrc: '/assets/products/health_ibuprofen.jpg',
      bgClass: 'med-icon'
    },
    {
      id: 106,
      name: 'Pañales Recién Nacido',
      brand: 'BabySoft',
      desc: 'Pack x 40 unidades',
      price: 45.00,
      category: 'Bebés',
      image: '👶',
      imageType: 'img',
      imageSrc: '/assets/products/health_diapers.jpg',
      bgClass: 'med-icon'
    }
  ];

  protected healthTips = signal<string>('');

  setHealthTab(tab: string, category: string = '') {
    this.healthTab.set(tab);
    if (category) this.healthActiveCategory.set(category);
    this.scrollToTop();
  }

  addToHealthCart(product: any) {
    this.healthCart.update(items => [...items, product]);
  }

  removeFromHealthCart(index: number) {
    this.healthCart.update(items => items.filter((_, i) => i !== index));
  }

  viewHealthProduct(product: any) {
    this.healthSelectedProduct.set(product);
    this.healthTab.set('product');
    this.scrollToTop();
  }

  get healthCartTotal() {
    return this.healthCart().reduce((total, item) => total + item.price, 0);
  }

  searchHealthProducts() {
    const query = this.healthSearchQuery().toLowerCase().trim();
    this.healthSearchPerformed.set(true);

    if (!query) {
      this.healthSearchResults.set([]);
      this.healthSearchPerformed.set(false);
      this.healthTab.set('home');
      return;
    }

    const results = this.healthProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.desc.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );

    this.healthSearchResults.set(results);
    this.healthTab.set('search');
    this.scrollToTop();
  }

  toggleHealthChat() {
    this.healthChatOpen.update(open => !open);
    // Initialize with welcome messages if first time opening
    if (this.healthChatOpen() && this.chatMessages().length === 0) {
      this.chatMessages.set([
        { text: '¡Hola! Soy el Dr. Carlos Cabrera, farmacéutico certificado. ¿En qué puedo ayudarte hoy?', sender: 'pharmacist', time: this.getCurrentTime() },
        { text: 'Puedo ayudarte con consultas sobre medicamentos, recomendaciones de productos, interacciones medicamentosas e información sobre síntomas.', sender: 'pharmacist', time: this.getCurrentTime() }
      ]);
    }
  }

  closeHealthChat() {
    this.healthChatOpen.set(false);
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  sendChatMessage() {
    const message = this.chatInput().trim();
    if (!message) return;

    // Add user message
    this.chatMessages.update(msgs => [...msgs, { text: message, sender: 'user', time: this.getCurrentTime() }]);
    this.chatInput.set('');

    // Show typing indicator
    this.isPharmacistTyping.set(true);

    // Simulate pharmacist response after delay
    setTimeout(() => {
      this.isPharmacistTyping.set(false);
      const response = this.getPharmacistResponse(message);
      this.chatMessages.update(msgs => [...msgs, { text: response, sender: 'pharmacist', time: this.getCurrentTime() }]);
    }, 1500);
  }

  getPharmacistResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    // Greetings
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
      return '¡Hola! Es un placer atenderte. ¿Tienes alguna consulta sobre medicamentos o necesitas recomendaciones para algún síntoma?';
    }

    // Stomach issues - CHECK BEFORE GENERIC PAIN
    if (lowerMessage.includes('estómago') || lowerMessage.includes('estomago') || lowerMessage.includes('digestión') || lowerMessage.includes('digestion') || lowerMessage.includes('náuseas') || lowerMessage.includes('nauseas') || lowerMessage.includes('gastritis') || lowerMessage.includes('acidez')) {
      return 'Para problemas estomacales tenemos varias opciones: antiácidos como Omeprazol, protectores gástricos y probióticos para mejorar la digestión. ¿Podrías describirme mejor tus síntomas para darte una recomendación más precisa?';
    }

    // Headache/Pain - More specific to head pain
    if (lowerMessage.includes('cabeza') || (lowerMessage.includes('dolor') && !lowerMessage.includes('estomago') && !lowerMessage.includes('estómago')) || lowerMessage.includes('migraña') || lowerMessage.includes('jaqueca')) {
      return 'Para el dolor de cabeza, te recomiendo nuestro Paracetamol 500mg o Ibuprofeno 400mg. Ambos son muy efectivos. ¿Tienes alguna alergia a medicamentos que deba considerar?';
    }

    // Fever
    if (lowerMessage.includes('fiebre') || lowerMessage.includes('temperatura')) {
      return 'Para controlar la fiebre, el Paracetamol es muy efectivo. Te recomiendo tomar 500-1000mg cada 6-8 horas. También es importante mantenerse hidratado. ¿Necesitas que te explique las indicaciones?';
    }

    // Cold/Flu
    if (lowerMessage.includes('gripe') || lowerMessage.includes('resfriado') || lowerMessage.includes('tos') || lowerMessage.includes('congestión')) {
      return 'Para síntomas de gripe te recomiendo: un antigripal para el malestar general, vitamina C para reforzar defensas, y mucho descanso. Tenemos varias opciones disponibles. ¿Te gustaría ver nuestros productos?';
    }

    // Vitamins
    if (lowerMessage.includes('vitamina') || lowerMessage.includes('defensas') || lowerMessage.includes('energía')) {
      return 'Nuestro Multivitamínico Plus de VitaLife es excelente para reforzar las defensas y mantener buenos niveles de energía. Contiene vitaminas A, C, D, E y complejo B. ¿Te interesa?';
    }

    // Sunscreen
    if (lowerMessage.includes('sol') || lowerMessage.includes('protector') || lowerMessage.includes('bronceado')) {
      return 'El Protector Solar SPF50 de DermaCare ofrece protección de amplio espectro contra rayos UVA y UVB. Es resistente al agua y perfecto para todo tipo de piel. ¡Muy recomendado!';
    }

    // Baby products
    if (lowerMessage.includes('bebé') || lowerMessage.includes('pañal') || lowerMessage.includes('niño')) {
      return 'Tenemos una línea completa de productos para bebés. Nuestros Pañales BabySoft son hipoalergénicos y súper absorbentes. ¿Buscas algo específico para tu pequeño?';
    }

    // Thanks
    if (lowerMessage.includes('gracias') || lowerMessage.includes('perfecto') || lowerMessage.includes('excelente')) {
      return '¡De nada! Es un placer ayudarte. Recuerda que siempre es importante leer las indicaciones del empaque. Si tienes más consultas, aquí estaré. ¡Que te mejores!';
    }

    // Price inquiry
    if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuánto')) {
      return 'Puedes ver los precios de todos nuestros productos en la tienda. ¿Te gustaría que te recomiende algo específico según tu presupuesto?';
    }

    // Default response
    return 'Entiendo tu consulta. Para darte la mejor recomendación, ¿podrías darme más detalles sobre tus síntomas o qué tipo de producto estás buscando? Estoy aquí para ayudarte.';
  }

  updateChatInput(value: string) {
    this.chatInput.set(value);
  }

  handleChatKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendChatMessage();
    }
  }

  onClose() {
    this.close.emit();
  }
}
