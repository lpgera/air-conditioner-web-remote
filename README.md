# Air conditioner web remote

A web interface for controlling an air conditioner via IR codes using a Raspberry Pi and LIRC.

The original hardware remote controls of the air conditioners are usually stateful. This means that they don't send
single commands like "turn on" on a single button press, but rather send every state (mode, temperature, swing, etc...)
on each key press. For this reason, this project does not aim to provide a fully functional replacement of the hardware
remote. The goal is to be able to turn the device on and off via a web interface.

The included `ac.conf` LIRC configuration file will only work with certain Samsung air conditioners.

## Prerequisites

You'll need a Raspberry Pi and an infrared emitter to be able to use this software.

To set up LIRC, run the following commands:

```bash
sudo apt update
sudo apt install lirc
```

Add the following lines to `/boot/config.txt`, and set the GPIO number your IR module is attached to:

```
dtoverlay=gpio-ir-tx,gpio_pin=4
```

Edit the `driver` and `device` values in `/etc/lirc/lirc_options.conf`:

```
driver          = default
device          = /dev/lirc0
```

Add the following lines to `/etc/lirc/hardware.conf`:

```
LIRCD_ARGS="--uinput --listen"
LOAD_MODULES=true
DRIVER="default"
DEVICE="/dev/lirc0"
MODULES="lirc_rpi"
```

Link the remote configuration file to the LIRC directory:

```bash
sudo ln -s ac.conf /etc/lirc/lircd.conf.d/ac.conf
```

Finally, reload the `lircd` service:

```bash
sudo systemctl stop lircd
sudo systemctl start lircd
```

## Setup

Install `pm2` process manager globally:

```bash
sudo npm i -g pm2
pm2 startup
```

Install dependencies:

```bash
npm i
```

Specify the port on which the server should start listening in a `.env` file:

```
PORT=8080
```

Start application with `pm2`:

```bash
pm2 start ecosystem.config.js
```
