from uuid import uuid4

from grlczip import app
    



@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/gpu/nvidia/<cuda>/<address>')
def dl_nvidia(cuda, address):
	return 'nvidia'

@app.route('/gpu/amd/<address>')
def dl_amd(address):
	return 'nvidia'

@app.route('/cpu/<arch>/<address>')
def dl_cpu(arch, address):
	return app.root_path
