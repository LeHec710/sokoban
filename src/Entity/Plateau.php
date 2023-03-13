<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\PlateauRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PlateauRepository::class)]
#[ApiResource(
    operations: [
        new Get(normalizationContext: ['groups' => 'plateau:item']),
        new GetCollection(normalizationContext: ['groups' => 'plateau:list'])
    ],
    order: ['name' => 'ASC'],
    paginationEnabled: false,
)]
class Plateau
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?string $rows = null;

    #[ORM\Column(length: 255)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?string $cols = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getRows(): ?string
    {
        return $this->rows;
    }

    public function setRows(string $rows): self
    {
        $this->rows = $rows;

        return $this;
    }

    public function getCols(): ?string
    {
        return $this->cols;
    }

    public function setCols(string $cols): self
    {
        $this->cols = $cols;

        return $this;
    }
}
