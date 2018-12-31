$(document).ready(function(){
    $('.delete-deliveryplan').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        var result = confirm("Are you sure you wish to delete this part of the schedule?");
        if (result){
            $.ajax({
                type:'DELETE',
                url: '/schedule/edit/'+id,
                success: function(response){
                    alert('Scheduled delivery deleted.');
                    window.location.href='/schedule';
                },
                error: function(err){
                    console.log(err);
                }
            });
        };
    });
});
