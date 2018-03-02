var download_base = 'https://garlic.wine'
var $idown;  // Keep it outside of the function, so it's initialized once.
function download_url(path) {
	url = download_base + path
	if ($idown) {
		$idown.attr('src',url);
	} else {
		$idown = $('<iframe>', { id:'idown', src:url }).hide().appendTo('body');
	}
}

$(document).ready(function() {

	$('#select_method').change(function() {
		if (this.value == 'gpu') {
			$('#input_wallet').hide()
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			$('#submit').hide()
			$('#select_gpu_make').css('display','inline');
			
		} else if (this.value =='cpu') {
			$('#select_gpu_make').hide()
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});
	$('#select_gpu_make').change(function() {
		if (this.value == 'nvidia') {
			$('#select_cuda_ver').css('display','inline');
			$('#cuda_info').css('display','inline');
			$('#input_wallet').hide()
			$('#submit').hide()
		} else {
			$('#select_cuda_ver').hide()
			$('#cuda_info').hide()
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});
	$('#select_cuda_ver').change(function() {
		if (this.value) {
			$('#input_wallet').css('display','inline');
			$('#submit').css('display','inline');
		}
	});

	$('#input_wallet').click(function(){
		this.value = ''
	});

	$('#input_wallet').focusout(function(){
		if (!this.value) { this.value = 'Enter GRLC Address' }
	});	

	$('#submit').click(function() {
		try{
			//if cpu
			if ( $('#select_method').val() == 'cpu') {
				if ($('#input_wallet').val() == 'Enter GRLC Address') { throw('Check address!') }
				download_url('/download/cpu/' + $('#input_wallet').val() + '/miner.zip')
			}
			//if gpu
			else if ($('#select_method').val() == 'gpu') {
				//if nvidia
				if ( $('#select_gpu_make').val() == 'nvidia' ) {
					if ( $('#select_cuda_ver').val() == 'select' ) { throw('Check CUDA version!') }
					else if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
					download_url('/download/nvidia/'+ $('#select_cuda_ver').val() + '/' + $('#input_wallet').val() + '/miner.zip')
				}
				//if amd
				else if ( $('#select_gpu_make').val() == 'amd' ) {
					if ( $('#input_wallet').val() == 'Enter GRLC Address' ) { throw('Check address!') }
				}
				else { throw('Check gpu make!') }
				download_url('/download/amd/' + $('#input_wallet').val() + '/miner.zip')
			}
			else { throw('Check method!') }

		} catch (err) {
			alert(err)
		}
	})
});