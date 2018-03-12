{% if miner == 'sgminer' %}
	.\miner\sgminer --algorithm allium -o stratum+tcp://eu.stratum.garlicpool.org:3333 -u ADDRESS -p x -I 14
{% else %}
	.\miner\{{ miner }} --algo=allium -o stratum+tcp://drink.garlic.wine:3333 -u {{ address }}
{% endif %}