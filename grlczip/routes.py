import os
from glob import glob
from shutil import copy, rmtree
from zipfile import ZipFile, ZIP_DEFLATED
from uuid import uuid4
from flask import send_file
from jinja2 import Environment, PackageLoader
from grlczip import app
    
data_path = os.path.sep.join(app.instance_path.split(os.path.sep)[:-1]) + '/data'

j_env = Environment(
    loader = PackageLoader('grlczip', 'templates')
    )

arch_to_bin = {
    'core2-nehalem': 'cpuminer',
    'westmere': 'cpuminer',
    'sandybridge-ivybridge': 'cpuminer',
    'haswell': 'cpuminer',
    'ryzen': 'cpuminer',
    'universal': 'universal',
    'amdgpu': 'sgminer',
    'cuda8': 'ccminer',
    'cuda9': 'ccminer',
}

def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root,file), os.path.relpath(os.path.join(root, file), os.path.join(path, '..')))

def build_miner(arch, address):
    bin_name = arch_to_bin[arch]
    job_uuid = str(uuid4())
    build_path = data_path + '/tmp/' + job_uuid
    zip_path = data_path + '/tmp/' + job_uuid + '.zip'

    os.mkdir(build_path)

    for file in glob(data_path + '/bins/' + arch + '/*'):
        copy(file, build_path)
    
    if arch in ('core2-nehalem', 'westmere', 'sandybridge-ivybridge', 'haswell', 'ryzen'):
        for file in glob(data_path + '/bins/cpu-opt-shared/*'):
            copy(file, build_path)

    template = j_env.get_template('StartMiner.bat')

    with open(build_path + '/StartMiner.bat', 'w+') as file:
        file.write(template.render(miner = bin_name, address = address))

    zipf = ZipFile(zip_path, 'x', ZIP_DEFLATED)
    zipdir (build_path, zipf)
    zipf.close()

    rmtree(build_path)

    # @after_this_request
    # def remove_archive():
    #     os.remove(zip_path)

    return send_file(zip_path, as_attachment=True, attachment_filename = arch + '_miner')

@app.route('/gpu/nvidia/<cuda>/<address>')
def dl_nvidia(cuda, address):
    return 'nvidia'

@app.route('/gpu/amd/<address>')
def dl_amd(address):
    return build_miner('amdgpu', address)

@app.route('/cpu/<arch>/<address>')
def dl_cpu(arch, address):
    return build_miner(arch, address)
