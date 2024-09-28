using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using blazormfe.Models;

namespace blazormfe.DTOs;

public class CarouselPayload
{
    [Required]
    [JsonPropertyName("animals")]
    public AnimalModel[] AnimalHooks { get; set; } = null!;

    [JsonPropertyName("customCarouselCss")]
    public string? CustomCarouselCss { get; set; } 
    
    [JsonPropertyName("customSlideCss")]
    public string? CustomSlideCss { get; set; }
    
    [JsonPropertyName("onAnimalSelected")]
    public Action<string> OnAnimalSelected { get; set; } = null!;
}