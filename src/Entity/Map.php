<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MapRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MapRepository::class)]
#[ApiResource]
class Map
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $nb_rows = null;

    #[ORM\Column]
    private ?int $nb_cols = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $grid = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNbRows(): ?int
    {
        return $this->nb_rows;
    }

    public function setNbRows(int $nb_rows): self
    {
        $this->nb_rows = $nb_rows;

        return $this;
    }

    public function getNbCols(): ?int
    {
        return $this->nb_cols;
    }

    public function setNbCols(int $nb_cols): self
    {
        $this->nb_cols = $nb_cols;

        return $this;
    }

    public function getGrid(): ?string
    {
        return $this->grid;
    }

    public function setGrid(string $grid): self
    {
        $this->grid = $grid;

        return $this;
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
}
