<template>
    <div>
        <div class="container">
            <div class="col">
                <label>Interface :</label>
                <input v-model="interface" class="form-control" type="text" name="Interface" placeholder="ens18 (eth0, …)" required />
            </div>
        </div>
        <div class="container">
            <div class="col">
                <label>IP :</label>
                <input v-model="ip" class="form-control" type="text" name="Adresse IP" placeholder="192.168…" required />
            </div>
            <div class="col">
                <label>Masque de sous réseau :</label>
                <input v-model="netmask" class="form-control" type="text" name="Masque de sous réseau" placeholder="255.255…" required />
            </div>
        </div>
        <div class="container">
            <div class="col">
                <label>Passerelle :</label>
                <input v-model="gateway" class="form-control" type="text" name="Passerelle" placeholder="192.168…" required />
            </div>
            <div class="col">
                <label>DNS :</label>
                <input v-model="dns" class="form-control" type="text" name="DNS" placeholder="192.168…" required />
            </div>
        </div>

        <div class="language-bash" data-ext="sh">
            <pre class="language-bash"><code>source /etc/network/interfaces.d/*

# Configuration de l'interface de loopback
auto lo
iface lo inet loopback

# Configuration de votre Interface
allow-hotplug {{ interface }}

auto {{ interface }}
iface {{ interface }} inet static
    address {{ ip }}
    netmask {{ netmask }}
    gateway {{ gateway }}
    dns-nameservers {{ dns }}</code></pre>
        </div>
    </div>
</template>

<script>
export default {
    name: "DebianConfiguration",
    updated() {
        try {
            localStorage.setItem("DebianConfiguration", JSON.stringify(this.$data));
        } catch (e) {
            // Ignore write errors.
        }
    },
    beforeMount() {
        try {
            const data = JSON.parse(localStorage.getItem("DebianConfiguration"));
            if (data) {
                this.vlan = data.vlan;
                this.interface = data.interface;
                this.ip = data.ip;
                this.netmask = data.netmask;
                this.gateway = data.gateway;
                this.dns = data.dns;
            }
        } catch (e) {
            // Ignore read errors.
        }
    },
    data() {
        return {
            vlan: "",
            interface: "ens18",
            ip: "192.168.1.1",
            netmask: "255.255.0.0",
            gateway: "192.168.235.254",
            dns: "192.168.10.1",
        }
    },
};
</script>

<style scoped>
.container {
    display: flex;
    width: 100%;
}

.col {
    flex-grow: 1;
    padding: 20px;
}

.col.center {
    text-align: center;
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

@media only screen and (max-width: 960px) {
    .container {
        display: block;
    }
}
</style>
