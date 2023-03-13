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

    #[ORM\Column(length: 11)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?int $rows = null;

    #[ORM\Column(length: 11)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?int $cols = null;

    #[ORM\Column(length: 10000)]
    #[Groups(['plateau:list', 'plateau:item'])]
    private ?array $grid = null;

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

    public function getRows(): ?int
    {
        return $this->rows;
    }

    public function setRows(int $rows): self
    {
        $this->rows = $rows;

        return $this;
    }

    public function getCols(): ?int
    {
        return $this->cols;
    }

    public function setCols(int $cols): self
    {
        $this->cols = $cols;

        return $this;
    }

    public function getGrid(): ?array
    {
        return $this->grid;
    }

    public function setGrid(array $grid): self
    {
        $this->grid = $grid;

        return $this;
    }
}
