$(document).ready(function(){
    $('.delete-downtimeevent').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        var result = confirm("Are you sure you wish to delete this event?");
        if (result){
            $.ajax({
                type:'DELETE',
                url: '/downtimeevent/'+id,
                success: function(response){
                    alert('Event deleted.');
                    window.location.href='/';
                },
                error: function(err){
                    console.log(err);
                }
            });
        };
    });
});
