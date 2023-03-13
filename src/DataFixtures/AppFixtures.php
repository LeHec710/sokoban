<?php

namespace App\DataFixtures;

use App\Entity\Plateaux;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $plateauA = new plateau;
        $plateauA
            ->setName("And")
            ->setRows("##########")
            ->setCols(".x#x.#.x##");
        $manager->persist($plateauA);
        $plateauC = new plateau;
        $plateauC
            ->setName("Cor")
            ->setRows("xx..##xx..##")
            ->setCols("xxx###...###");
        $manager->persist($plateauC);
        $plateauH = new plateau;
        $plateauH
            ->setName("Hec")
            ->setRows("x.x.#.x.#.#")
            ->setCols("#x..x##..xx");
        $manager->persist($plateauH);
        $manager->flush();
    }
}
