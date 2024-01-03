<template>
    <v-app>
        <navbarAdmin />
        <v-main>
            <v-container>
                <h2 class="mb-4">List Order</h2>
                <v-row v-if="orders.length === 0">
                    <v-col>
                        <v-alert type="info">Tidak ada pesanan.</v-alert>
                    </v-col>
                </v-row>
                <div v-if="orders.length > 0" class="order-list">
                    <div v-for="order in orders" :key="order.id" class="order-item">
                        <div class="product-image">
                            <img :src="order.foto" alt="Product Image" />
                        </div>
                        <div class="order-item-content">
                            <div class="headline">{{ order.namaProduk }}</div>
                            <div>Harga: Rp {{ order.harga }}</div>
                            <div>Tanggal pemesanan: {{ formatDate(order.tanggalPesan) }}</div>
                            <div>Status: {{ order.status }}</div>
                            <v-btn
                                v-if="order.status !== 'Sudah bayar'"
                                @click="confirmPayment(order.id)"
                            >
                                Konfirmasi Pembayaran
                            </v-btn>
                            <v-btn
                                v-else
                                disabled
                            >
                                Pembayaran sudah dikonfirmasi
                            </v-btn>
                        </div>
                    </div>
                </div>
            </v-container>
        </v-main>
    </v-app>
</template>

<!-- ... (rest of the script and style sections) ... -->


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import navbarAdmin from '@/components/navbarAdmin.vue';

const orders = ref([]);
const orderStatus = ref('');

const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:3001/api/game/pesanan`);
        orders.value = response.data.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};


const confirmPayment = async (orderId) => {
    try {
        const response = await axios.post(`http://localhost:3001/api/game/konfirmasi-pembayaran/${orderId}`);

        if (response.data.status) {
            console.log('Konfirmasi Pembayaran berhasil:', response.data);

            // Set the order status to 'sudah bayar'
            orderStatus.value = 'sudah bayar';

            // Optionally, you can update the orders array if needed
            const updatedOrders = orders.value.map((order) => {
                if (order.id === orderId) {
                    return { ...order, status_pesanan: 2 };
                }
                return order;
            });

            orders.value = updatedOrders;
        } else {
            console.error('Konfirmasi Pembayaran gagal:', response.data.message);
        }
    } catch (error) {
        console.error('Error confirming payment:', error);
    }
};

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

onMounted(fetchData);
</script>

<style scoped>
.order-list {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
}

.order-item {
    display: flex;
    align-items: flex-start;
    border: 1px solid #ddd;
    border-radius: 12px;
    margin-bottom: 20px;
    padding: 16px;
    transition: box-shadow 0.3s ease-in-out;
}

.order-item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
    max-width: 150px;
    max-height: 150px;
    overflow: hidden;
    border-radius: 8px;
    margin-right: 16px;
}

.order-item-content {
    flex: 1;
    padding: 28px;
}

.headline {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
}
</style>
