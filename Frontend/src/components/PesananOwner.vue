<!-- src/components/PesananListOwner.vue -->

<template>
    <div>
        <h2>List Pesanan</h2>
        <ul>
            <li v-for="pesanan in daftarPesanan" :key="pesanan.id">
                <div>
                    {{ pesanan.namaPemesan }} - Status: {{ pesanan.status }}
                    <button v-if="pesanan.status !== 'Sudah Bayar'" @click="konfirmasiPembayaran(pesanan.id)">
                        Konfirmasi Pembayaran
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        ownerUserId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            daftarPesanan: [],
        };
    },
    mounted() {
        this.loadDataPesanan();
    },
    methods: {
        async loadDataPesanan() {
            try {
                const response = await axios.get(`http://localhost:3001/api/pesanan/owner/${this.ownerUserId}`);
                this.daftarPesanan = response.data.data; // Sesuaikan dengan struktur respons dari backend
            } catch (error) {
                console.error('Error fetching pesanan data:', error);
            }
        },
        async konfirmasiPembayaran(pesananId) {
            try {
                // Ganti URL sesuai dengan endpoint API backend kamu
                await axios.put(`http://localhost:backend-port/api/pesanan/confirm/${pesananId}`);
                // Perbarui status di klien tanpa mengambil ulang data
                const pesanan = this.daftarPesanan.find(p => p.id === pesananId);
                if (pesanan) {
                    pesanan.status = 'Sudah Bayar';
                }
            } catch (error) {
                console.error('Error confirming payment:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Tambahkan gaya komponen jika diperlukan */
</style>
